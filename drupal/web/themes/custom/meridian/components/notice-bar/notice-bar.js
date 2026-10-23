(function (Drupal, once) {
    function enhanceNotices(bar) {
        const list = bar.querySelector('.notice-bar__list');
        const items = [...bar.querySelectorAll('.notice-bar__item')];

        if (!list || items.length < 2) {
            return;
        }

        const show = (index) => {
            items.forEach((item, position) => {
                item.hidden = position !== index;
            });
        };

        const targetedIndex = items.findIndex((item) => `#${item.id}` === window.location.hash);

        bar.classList.add('notice-bar--enhanced');
        list.setAttribute('aria-live', 'polite');
        show(Math.max(targetedIndex, 0));

        bar.addEventListener('click', (event) => {
            const step = event.target.closest('.notice-bar__step');

            if (!step) {
                return;
            }

            const next = items.findIndex((item) => `#${item.id}` === step.getAttribute('href'));

            if (next < 0) {
                return;
            }

            event.preventDefault();
            show(next);

            const direction = step.classList.contains('notice-bar__step--prev') ? 'prev' : 'next';
            items[next].querySelector(`.notice-bar__step--${direction}`)?.focus();
        });
    }

    Drupal.behaviors.meridianNoticeBar = {
        attach(context) {
            once('meridian-notice-bar-enhanceNotices', '.notice-bar', context).forEach(enhanceNotices);
        },
    };
})(Drupal, once);
