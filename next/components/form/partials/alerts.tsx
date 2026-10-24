export default function Alerts() {
    return (
        <form
            className="card card--padded form narrow"
            id="set-up-alerts"
            action="/flights/alerts"
            method="get"
            aria-labelledby="set-up-alerts-title"
        >
            <div className="card__head">
                <h2 className="card__title" id="set-up-alerts-title">
                    Set up alerts
                </h2>
            </div>
            <p className="form__note">
                This is a demonstration form for a fictional airport. Please do not enter real personal details. Nothing
                you type is sent anywhere.
            </p>
            <div className="field">
                <label className="field__label" htmlFor="flight">
                    Flight number <span className="field__marker">(required)</span>
                </label>
                <p className="field__hint" id="flight-hint">
                    For example, MA 204. It is on your booking confirmation.
                </p>
                <input
                    className="field__input"
                    id="flight"
                    name="flight"
                    type="text"
                    autoComplete="off"
                    aria-describedby="flight-hint"
                    required
                />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="flight-date">
                    Date of flight <span className="field__marker">(required)</span>
                </label>
                <input className="field__input" id="flight-date" name="date" type="date" required />
            </div>
            <fieldset className="fieldset fieldset--inline" aria-describedby="channel-hint">
                <legend className="fieldset__legend">
                    How should we send alerts? <span className="field__marker">(required)</span>
                </legend>
                <p className="field__hint" id="channel-hint">
                    Choose one
                </p>
                <label className="check">
                    <input className="check__input" type="radio" name="channel" value="text" required />
                    Text message
                </label>
                <label className="check">
                    <input className="check__input" type="radio" name="channel" value="whatsapp" />
                    WhatsApp
                </label>
            </fieldset>
            <div className="field">
                <label className="field__label" htmlFor="mobile">
                    Mobile number <span className="field__marker">(required)</span>
                </label>
                <p className="field__hint" id="mobile-hint">
                    A UK or international number, starting with 0 or +
                </p>
                <input
                    className="field__input"
                    id="mobile"
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    aria-describedby="mobile-hint"
                    required
                />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="email">
                    Email address <span className="field__marker">(optional)</span>
                </label>
                <p className="field__hint" id="email-hint">
                    We send a copy of each alert here too
                </p>
                <input
                    className="field__input"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-describedby="email-hint"
                />
            </div>
            <fieldset className="fieldset" aria-describedby="which-hint">
                <legend className="fieldset__legend">
                    Which alerts do you want? <span className="field__marker">(required)</span>
                </legend>
                <p className="field__hint" id="which-hint">
                    Choose all that apply
                </p>
                <label className="check">
                    <input className="check__input" type="checkbox" name="alert-gate" value="yes" />
                    Gate changes
                </label>
                <label className="check">
                    <input className="check__input" type="checkbox" name="alert-delays" value="yes" />
                    Delays and cancellations
                </label>
                <label className="check">
                    <input className="check__input" type="checkbox" name="alert-boarding" value="yes" />
                    Boarding calls
                </label>
                <label className="check">
                    <input className="check__input" type="checkbox" name="alert-bags" value="yes" />
                    Bags on the belt (arrivals only)
                </label>
            </fieldset>
            <div className="field">
                <label className="check">
                    <input
                        className="check__input"
                        type="checkbox"
                        name="consent"
                        value="yes"
                        aria-describedby="consent-hint"
                        required
                    />
                    I agree to receive alerts about this flight <span className="field__marker">(required)</span>
                </label>
                <p className="field__hint" id="consent-hint">
                    Alerts stop 2 hours after the flight lands or departs
                </p>
            </div>
            <div className="form__actions">
                <button className="button button--lg" type="submit">
                    Sign up for alerts
                </button>
            </div>
        </form>
    );
}
