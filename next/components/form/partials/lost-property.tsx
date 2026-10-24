export default function LostProperty() {
    return (
        <form
            className="card card--padded form narrow"
            id="report-lost-item"
            action="/help/baggage-and-lost-property#lost-property"
            method="get"
            aria-labelledby="report-lost-item-title"
        >
            <div className="card__head">
                <h2 className="card__title" id="report-lost-item-title">
                    Report a lost item
                </h2>
            </div>
            <p className="form__note">
                This is a demonstration form for a fictional airport. Please do not enter real personal details. Nothing
                you type is sent anywhere.
            </p>
            <div className="field">
                <label className="field__label" htmlFor="lp-name">
                    Full name
                </label>
                <input className="field__input" id="lp-name" name="lp-name" type="text" autoComplete="name" required />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="lp-email">
                    Email address
                </label>
                <p className="field__hint" id="lp-email-hint">
                    We contact you here if we find a match
                </p>
                <input
                    className="field__input"
                    id="lp-email"
                    name="lp-email"
                    type="email"
                    autoComplete="email"
                    aria-describedby="lp-email-hint"
                    required
                />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="lp-date">
                    Date you lost it
                </label>
                <input className="field__input" id="lp-date" name="lp-date" type="date" required />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="lp-where">
                    Where were you?
                </label>
                <select className="field__input" id="lp-where" name="lp-where" required>
                    <option value="">Choose where you lost the item</option>
                    <option value="terminal-1-before-security">Terminal 1 before security</option>
                    <option value="terminal-1-after-security">Terminal 1 after security</option>
                    <option value="terminal-2-before-security">Terminal 2 before security</option>
                    <option value="terminal-2-after-security">Terminal 2 after security</option>
                    <option value="a-car-park-or-shuttle-bus">A car park or shuttle bus</option>
                    <option value="railway-station">Railway station</option>
                    <option value="not-sure">Not sure</option>
                </select>
            </div>
            <div className="field">
                <label className="field__label" htmlFor="lp-place">
                    Where exactly? <span className="field__marker">(optional)</span>
                </label>
                <p className="field__hint" id="lp-place-hint">
                    For example, security lane 3 or the Skyline Kitchen
                </p>
                <input
                    className="field__input"
                    id="lp-place"
                    name="lp-place"
                    type="text"
                    aria-describedby="lp-place-hint"
                />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="lp-item">
                    What did you lose?
                </label>
                <p className="field__hint" id="lp-item-hint">
                    Colour, brand, size and anything inside
                </p>
                <textarea
                    className="field__input field__input--multiline"
                    id="lp-item"
                    name="lp-item"
                    rows={5}
                    aria-describedby="lp-item-hint"
                    required
                ></textarea>
            </div>
            <div className="field">
                <label className="field__label" htmlFor="lp-flight">
                    Flight number <span className="field__marker">(optional)</span>
                </label>
                <p className="field__hint" id="lp-flight-hint">
                    If you were flying that day
                </p>
                <input
                    className="field__input"
                    id="lp-flight"
                    name="lp-flight"
                    type="text"
                    aria-describedby="lp-flight-hint"
                />
            </div>
            <div className="form__actions">
                <button className="button button--lg" type="submit">
                    Report lost item
                </button>
            </div>
        </form>
    );
}
