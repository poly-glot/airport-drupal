(function (Drupal, once) {
    function fullyVisibleRange(track, items) {
        const bounds = track.getBoundingClientRect();
        const visible = items
            .map((item, index) => ({ index, rect: item.getBoundingClientRect() }))
            .filter(({ rect }) => rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1)
            .map(({ index }) => index);

        if (visible.length > 0) {
            return [visible[0], visible[visible.length - 1]];
        }

        const centre = bounds.left + bounds.width / 2;
        const nearest = items.findIndex((item) => item.getBoundingClientRect().right >= centre);
        const index = Math.max(nearest, 0);

        return [index, index];
    }

    function enhanceCityRail(rail) {
        const track = rail.querySelector('.city-rail__track');
        const items = [...rail.querySelectorAll('.city-rail__item')];
        const count = rail.querySelector('.city-rail__count');
        const prev = rail.querySelector('.city-rail__button--prev');
        const next = rail.querySelector('.city-rail__button--next');

        if (!track || items.length < 2 || !count || !prev || !next) {
            return;
        }

        const step = () => items[1].offsetLeft - items[0].offsetLeft;

        const update = () => {
            const progress = Math.min(1, (track.scrollLeft + track.clientWidth) / track.scrollWidth);
            const [first, last] = fullyVisibleRange(track, items);

            rail.style.setProperty('--rail-progress', progress.toFixed(3));
            count.textContent = first === last ? `${first + 1} / ${items.length}` : `${first + 1} – ${last + 1} / ${items.length}`;
        };

        prev.addEventListener('click', () => track.scrollBy({ left: -step() }));
        next.addEventListener('click', () => track.scrollBy({ left: step() }));
        track.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        rail.classList.add('city-rail--enhanced');
        update();
    }

    Drupal.behaviors.meridianCityRail = {
        attach(context) {
            once('meridian-city-rail-enhanceCityRail', '.city-rail', context).forEach(enhanceCityRail);
        },
    };
})(Drupal, once);
