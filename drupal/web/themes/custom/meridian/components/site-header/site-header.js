(function (Drupal, once) {
    function enhanceMenu(header) {
        const toggle = header.querySelector('.header__menu-toggle');
        const nav = header.querySelector('.header__nav');

        if (!toggle || !nav) {
            return;
        }

        const setOpen = (open) => {
            header.classList.toggle('header--open', open);
            toggle.setAttribute('aria-expanded', String(open));
        };

        header.classList.add('header--enhanced');
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('aria-controls', nav.id);
        setOpen(false);

        toggle.addEventListener('click', (event) => {
            event.preventDefault();
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });

        toggle.addEventListener('keydown', (event) => {
            if (event.key !== ' ') {
                return;
            }

            event.preventDefault();
            toggle.click();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape' || !header.classList.contains('header--open')) {
                return;
            }

            setOpen(false);
            toggle.focus();
        });
    }

    Drupal.behaviors.meridianSiteHeader = {
        attach(context) {
            once('meridian-site-header-enhanceMenu', '.header', context).forEach(enhanceMenu);
        },
    };
})(Drupal, once);
