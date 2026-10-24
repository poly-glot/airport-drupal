export default function FlightSearch() {
    return (
        <form className="search-card on-light" action="/flights" method="get" aria-label="Flight tracking">
            <div className="search-card__tabs">
                <span className="search-card__tab search-card__tab--current">Flight tracking</span>
                <a className="search-card__tab" href="/at-the-airport/lounges">
                    Fast Track
                </a>
                <a className="search-card__tab" href="/at-the-airport/lounges">
                    Lounges
                </a>
            </div>
            <fieldset className="fieldset fieldset--inline">
                <legend className="visually-hidden">Direction</legend>
                <label className="check">
                    <input className="check__input" type="radio" name="direction" value="departures" defaultChecked />
                    Departures
                </label>
                <label className="check">
                    <input className="check__input" type="radio" name="direction" value="arrivals" />
                    Arrivals
                </label>
            </fieldset>
            <div className="field">
                <label className="field__label" htmlFor="flight-day">
                    When
                </label>
                <select className="field__input field__input--soft" id="flight-day" name="day">
                    <option value="2026-10-03">Today, 3 October</option>
                    <option value="2026-10-04">Tomorrow, 4 October</option>
                    <option value="2026-10-05">Monday, 5 October</option>
                </select>
            </div>
            <div className="field">
                <label className="field__label" htmlFor="flight-search">
                    Flight number, airline or city
                </label>
                <div className="field__control">
                    <svg
                        className="field__icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="7"></circle>
                        <path d="M20 20l-4-4"></path>
                    </svg>
                    <input
                        className="field__input field__input--soft field__input--with-icon"
                        id="flight-search"
                        name="q"
                        type="search"
                        placeholder="e.g. MA 204 or Lisbon"
                    />
                </div>
            </div>
            <button className="button button--lg search-card__submit" type="submit">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M3 21h18M4 15l16-5-3-5-5 2-5-4-2 1 3 5-4 1-2-2-2 1z"></path>
                </svg>
                Search flights
            </button>
            <a className="text-link text-link--sm" href="/flights#arrivals">
                Meeting someone? Go to live arrivals
                <svg
                    className="text-link__icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    <path d="M9 6l6 6-6 6"></path>
                </svg>
            </a>
        </form>
    );
}
