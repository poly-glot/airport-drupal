(function (Drupal, once) {
    const SKY_DAYPART_HOURS = { morning: [5, 11], afternoon: [12, 16], evening: [17, 20] };

    const SKY_PREVIEW_TIMES = { morning: '09:42', afternoon: '14:30', evening: '19:15', night: '23:50' };

    const SKY_WEATHERS = {
        cloudy: { label: 'cloudy', nightLabel: 'cloudy', temp: '14°C' },
        rainy: { label: 'light rain', nightLabel: 'light rain', temp: '12°C' },
        sunny: { label: 'sunny', nightLabel: 'clear', temp: '18°C' },
    };

    const daypartFromHour = (hour) => Object.keys(SKY_DAYPART_HOURS).find((name) => hour >= SKY_DAYPART_HOURS[name][0] && hour <= SKY_DAYPART_HOURS[name][1]) ?? 'night';

    function enhanceHeroSky(hero) {
        const picture = hero.querySelector('.hero__media');
        const weatherBlock = hero.querySelector('.hero__weather');
        const defaultWeather = hero.dataset.weather;

        if (!picture || !weatherBlock || !SKY_WEATHERS[defaultWeather]) {
            return;
        }

        const requested = new URLSearchParams(window.location.search).get('sky') ?? '';
        const override = requested.match(/^(morning|afternoon|evening|night)-(sunny|cloudy|rainy)$/);
        const daypart = override ? override[1] : daypartFromHour(new Date().getHours());
        const weather = override ? override[2] : defaultWeather;
        const variant = `${daypart}-${weather}`;

        [...picture.querySelectorAll('source'), picture.querySelector('img')].forEach((element) => {
            ['src', 'srcset'].forEach((attribute) => {
                const value = element.getAttribute(attribute);

                if (value) {
                    element.setAttribute(attribute, value.replaceAll('morning-rainy', variant));
                }
            });
        });

        const icon = daypart === 'night' || daypart === 'evening' ? daypart : 'day';
        weatherBlock.querySelectorAll('.hero__weather-icon').forEach((svg) => {
            svg.toggleAttribute('hidden', !svg.classList.contains(`hero__weather-icon--${icon}`));
        });

        weatherBlock.classList.toggle('hero__weather--dry', weather !== 'rainy');
        weatherBlock.querySelector('.hero__temp-value').textContent = SKY_WEATHERS[weather].temp;
        weatherBlock.querySelector('.hero__condition').textContent = daypart === 'night' ? SKY_WEATHERS[weather].nightLabel : SKY_WEATHERS[weather].label;

        const now = new Date();
        const dateText = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', weekday: 'long' }).format(now);
        const timeText = override ? SKY_PREVIEW_TIMES[daypart] : new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(now);
        weatherBlock.querySelector('.hero__date').textContent = `${dateText} · ${timeText} local`;

        hero.dataset.sky = variant;
    }

    Drupal.behaviors.meridianHero = {
        attach(context) {
            once('meridian-hero-enhanceHeroSky', '.hero', context).forEach(enhanceHeroSky);
        },
    };
})(Drupal, once);
