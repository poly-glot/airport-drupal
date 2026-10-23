(function (Drupal, once) {
    const TAB_KEY_OFFSETS = { ArrowLeft: -1, ArrowRight: 1 };

    const wrapIndex = (index, length) => (index + length) % length;

    function enhanceTabs(root) {
        const list = root.querySelector('.tabs__list');
        const tabs = [...root.querySelectorAll('.tabs__tab')];
        const panels = tabs.map((tab) => root.querySelector(tab.getAttribute('href')));

        if (!list || tabs.length === 0 || panels.includes(null)) {
            return;
        }

        const select = (index, moveFocus) => {
            tabs.forEach((tab, position) => {
                const selected = position === index;

                tab.setAttribute('aria-selected', String(selected));
                tab.tabIndex = selected ? 0 : -1;
                panels[position].hidden = !selected;
            });

            if (moveFocus) {
                tabs[index].focus();
            }
        };

        const selectFromHash = () => {
            const targeted = panels.findIndex((panel) => `#${panel.id}` === window.location.hash);

            if (targeted >= 0) {
                select(targeted, false);
            }
        };

        list.setAttribute('role', 'tablist');

        if (list.dataset.tabsLabel) {
            list.setAttribute('aria-label', list.dataset.tabsLabel);
        }

        tabs.forEach((tab, position) => {
            const panel = panels[position];

            tab.id = tab.id || `${panel.id}-tab`;
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-controls', panel.id);
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-labelledby', tab.id);

            tab.addEventListener('click', (event) => {
                event.preventDefault();
                select(position, false);
            });
        });

        list.addEventListener('keydown', (event) => {
            const current = tabs.indexOf(document.activeElement);

            if (current < 0) {
                return;
            }

            if (event.key === ' ') {
                event.preventDefault();
                select(current, false);
                return;
            }

            const lastIndex = tabs.length - 1;
            const destinations = {
                End: lastIndex,
                Home: 0,
            };

            const offset = TAB_KEY_OFFSETS[event.key];
            const destination = offset === undefined ? destinations[event.key] : wrapIndex(current + offset, tabs.length);

            if (destination === undefined) {
                return;
            }

            event.preventDefault();
            select(destination, true);
        });

        root.classList.add('tabs--enhanced');
        select(0, false);
        selectFromHash();
        window.addEventListener('hashchange', selectFromHash);
    }

    const BOARD_SEARCH_CELLS = ['.board__place', '.board__flight', '.board__terminal'];

    const normalise = (text) => text.trim().toLowerCase();

    function rowSearchText(row) {
        return normalise(BOARD_SEARCH_CELLS.map((selector) => row.querySelector(selector)?.textContent ?? '').join(' '));
    }

    function enhanceBoardSearch(board) {
        const searches = [...board.querySelectorAll('.board__search')];

        if (searches.length === 0) {
            return;
        }

        searches.forEach((search) => {
            const panel = search.closest('.board__body');
            const input = search.querySelector('input');
            const table = panel?.querySelector('.board__table');
            const tbody = table?.querySelector('tbody');

            if (!input || !tbody) {
                return;
            }

            const rows = [...tbody.querySelectorAll('.board__row')].map((row) => ({ row, text: rowSearchText(row) }));
            const boardName = normalise(table.querySelector('caption')?.textContent ?? 'flight');
            const columnCount = table.querySelectorAll('thead th').length;

            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.className = 'board__empty';
            emptyCell.colSpan = columnCount;
            emptyRow.hidden = true;
            emptyRow.append(emptyCell);
            tbody.append(emptyRow);

            const announcer = document.createElement('p');
            announcer.className = 'visually-hidden';
            announcer.setAttribute('role', 'status');
            search.append(announcer);

            input.addEventListener('input', () => {
                const query = normalise(input.value);
                let shown = 0;

                rows.forEach(({ row, text }) => {
                    const match = text.includes(query);
                    row.hidden = !match;
                    shown += match ? 1 : 0;
                });

                const noMatch = shown === 0;
                const message = `No flights match "${input.value.trim()}" on the ${boardName} board. Try the flight number (e.g. MA 204) or the city.`;

                emptyCell.textContent = noMatch ? message : '';
                emptyRow.hidden = !noMatch;
                announcer.textContent = query === '' ? '' : noMatch ? message : `${shown} of ${rows.length} ${boardName} shown`;
            });
        });

        board.classList.add('board--enhanced');
    }

    function enhanceStatusTips() {
        if (!document.querySelector('.board__state[data-tip]')) {
            return;
        }

        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') {
                return;
            }

            document.querySelectorAll('.board__state[data-tip]').forEach((state) => {
                if (!state.matches(':hover, :focus')) {
                    return;
                }

                const restore = () => state.classList.remove('board__state--tip-dismissed');

                state.classList.add('board__state--tip-dismissed');
                state.addEventListener('mouseleave', restore, { once: true });
                state.addEventListener('blur', restore, { once: true });
            });
        });
    }

    const FLAP_DRUM = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.';

    const FLAP_STEP_MS = 80;

    const FLAP_LEAD_MAX = 8;

    const FLAP_TILE_STAGGER_MS = 22;

    const FLAP_ROW_STAGGER_MS = 70;

    const FLAP_EVENT_GAP_MS = 6000;

    const FOLD_DOWN = [
        { opacity: 1, transform: 'rotateX(0deg)' },
        { opacity: 1, transform: 'rotateX(-90deg)' },
    ];

    const LAND = [
        { opacity: 1, transform: 'rotateX(90deg)' },
        { opacity: 1, transform: 'rotateX(0deg)' },
    ];

    const FLAP_STATES = {
        boarding: { label: 'Boarding', tone: 'info' },
        'delayed-arrival': { label: 'Delayed', tone: 'warn' },
        'delayed-departure': { label: 'Delayed', tone: 'warn' },
        'gate-open': { label: 'Gate open', tone: 'info' },
    };

    const BOARD_EVENTS_URL = '/assets/data/board-events.json';

    async function boardEvents() {
        const response = await fetch(BOARD_EVENTS_URL);

        return response.ok ? (await response.json()).events : [];
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const flipRuns = new WeakMap();

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const toFlapChars = (text, width) => [...text.toUpperCase().replaceAll('—', ' ').padEnd(width).slice(0, width)];

    const flipTarget = (tile) => flipRuns.get(tile)?.target ?? ' ';

    function createTile() {
        const tile = document.createElement('span');
        tile.className = 'flap__tile';

        ['top', 'bottom', 'top', 'bottom'].forEach((half, index) => {
            const part = document.createElement('span');
            part.className = `flap__half flap__half--${half}${index > 1 ? ' flap__leaf' : ''}`;
            part.dataset.char = ' ';
            tile.append(part);
        });

        return tile;
    }

    function showChar(tile, char) {
        [...tile.children].forEach((part) => {
            part.dataset.char = char;
        });
    }

    function flipPath(target) {
        const anchor = FLAP_DRUM.indexOf(target);
        const origin = anchor < 0 ? Math.floor(Math.random() * FLAP_DRUM.length) : anchor;
        const lead = 2 + Math.floor(Math.random() * (FLAP_LEAD_MAX - 1));
        const approach = Array.from({ length: lead }, (_, step) => FLAP_DRUM.at(origin - lead + step));

        return [...approach, target];
    }

    async function flipStep(tile, next) {
        const [top, bottom, leafTop, leafBottom] = tile.children;
        const halfStep = { duration: FLAP_STEP_MS / 2 };

        leafTop.dataset.char = top.dataset.char;
        top.dataset.char = next;
        leafBottom.dataset.char = next;

        await leafTop.animate(FOLD_DOWN, { ...halfStep, easing: 'ease-in' }).finished;
        await leafBottom.animate(LAND, { ...halfStep, easing: 'ease-out' }).finished;

        bottom.dataset.char = next;
    }

    async function flipTile(tile, target, delay) {
        const run = { target };
        flipRuns.set(tile, run);

        if (reducedMotion.matches) {
            showChar(tile, target);
            return;
        }

        await wait(delay);

        for (const char of flipPath(target)) {
            if (flipRuns.get(tile) !== run) {
                return;
            }

            await flipStep(tile, char);
        }
    }

    function flipText(element, { fromBlank = false, delay = 0 } = {}) {
        const tiles = [...element.querySelector('.flap').children];
        const chars = toFlapChars(element.dataset.flapText, tiles.length);

        tiles.forEach((tile, index) => {
            if (fromBlank) {
                flipRuns.delete(tile);
                showChar(tile, ' ');
            }

            if (flipTarget(tile) === chars[index]) {
                return;
            }

            flipTile(tile, chars[index], delay + index * FLAP_TILE_STAGGER_MS);
        });
    }

    function enhanceFlap(element) {
        const width = Number(element.dataset.flap);
        const text = element.textContent.trim();

        const flap = document.createElement('span');
        flap.className = 'flap';
        flap.setAttribute('aria-hidden', 'true');
        flap.append(...Array.from({ length: width }, createTile));

        const spoken = document.createElement('span');
        spoken.className = 'visually-hidden';
        spoken.textContent = element.dataset.flapLabel ?? text;

        element.dataset.flapText = text;
        element.replaceChildren(flap, spoken);
    }

    function setFlap(element, text) {
        element.dataset.flapText = text;
        element.querySelector('.visually-hidden').textContent = text;
        flipText(element);
    }

    function replayPanel(panel) {
        panel.querySelectorAll('.board__row').forEach((row, rowIndex) => {
            row.querySelectorAll('[data-flap]').forEach((element) => {
                const cellIndex = element.closest('td').cellIndex;
                flipText(element, { delay: rowIndex * FLAP_ROW_STAGGER_MS + cellIndex * 4 * FLAP_TILE_STAGGER_MS, fromBlank: true });
            });
        });
    }

    function findRow(panel, flight) {
        return [...panel.querySelectorAll('.board__row')].find((row) => row.querySelector('.board__flight').dataset.flapText === flight);
    }

    function applyState(row, stateName) {
        const state = FLAP_STATES[stateName];
        const remark = row.querySelector('.board__state');
        const definition = document.getElementById(`status-${stateName}`);

        remark.className = `board__state board__state--${state.tone}`;
        row.querySelector('.flap-lamp').className = `flap-lamp flap-lamp--${state.tone}`;

        if (definition) {
            remark.dataset.tip = definition.textContent;
            remark.setAttribute('aria-describedby', definition.id);
        }

        setFlap(remark, state.label);
    }

    function advanceClock(board) {
        const clock = board.querySelector('.board__clock-time');
        const [hours, minutes] = clock.dataset.flapText.split(':').map(Number);
        const time = new Date(2000, 0, 1, hours, minutes + 1).toTimeString().slice(0, 5);

        setFlap(clock, time);
        board.querySelector('.board__updated').textContent = time;
    }

    function applyEvent(board, event) {
        const panel = board.querySelector(`#${event.board}`);
        const row = findRow(panel, event.flight);

        if (!row) {
            return;
        }

        if (event.gate) {
            setFlap(row.querySelector('.board__gate'), event.gate);
        }

        if (event.state) {
            applyState(row, event.state);
        }

        if (event.note !== undefined) {
            row.querySelector('.board__info').textContent = event.note;
        }

        advanceClock(board);

        if (!panel.hidden) {
            board.querySelector('[data-flap-announcer]').textContent = event.announce;
        }
    }

    function enhanceSplitFlap(board) {
        const panels = [...board.querySelectorAll('.board__panel')];

        board.querySelectorAll('[data-flap]').forEach(enhanceFlap);

        const observer = new MutationObserver((mutations) => {
            mutations
                .filter((mutation) => !mutation.target.hidden)
                .forEach((mutation) => replayPanel(mutation.target));
        });

        panels.forEach((panel) => observer.observe(panel, { attributeFilter: ['hidden'] }));
        panels.filter((panel) => !panel.hidden).forEach(replayPanel);
        flipText(board.querySelector('.board__clock-time'), { fromBlank: true });

        boardEvents().then((events) => {
            events.forEach((event, index) => {
                setTimeout(() => applyEvent(board, event), (index + 1) * FLAP_EVENT_GAP_MS);
            });
        });
    }

    Drupal.behaviors.meridianFlightBoard = {
        attach(context) {
            once('meridian-flight-board-enhanceTabs', '.tabs', context).forEach(enhanceTabs);
            once('meridian-flight-board-enhanceBoardSearch', '.board', context).forEach(enhanceBoardSearch);
            once('meridian-flight-board-enhanceSplitFlap', '.board', context).forEach(enhanceSplitFlap);
            once('meridian-flight-board-enhanceStatusTips', 'body', context).forEach(enhanceStatusTips);
        },
    };
})(Drupal, once);
