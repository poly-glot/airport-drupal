export default function Assistance() {
    return (
        <form
            className="card card--padded form narrow"
            id="request"
            action="/help/special-assistance#request"
            method="get"
            aria-labelledby="request-title"
        >
            <div className="card__head">
                <h2 className="card__title" id="request-title">
                    Request assistance
                </h2>
            </div>
            <p className="form__note">
                This is a demonstration form for a fictional airport. Please do not enter real personal details. Nothing
                you type is sent anywhere.
            </p>
            <div className="field">
                <label className="field__label" htmlFor="sa-name">
                    Full name
                </label>
                <p className="field__hint" id="sa-name-hint">
                    As it appears on your booking
                </p>
                <input
                    className="field__input"
                    id="sa-name"
                    name="sa-name"
                    type="text"
                    autoComplete="name"
                    aria-describedby="sa-name-hint"
                    required
                />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="sa-email">
                    Email address
                </label>
                <p className="field__hint" id="sa-email-hint">
                    We send your confirmation here
                </p>
                <input
                    className="field__input"
                    id="sa-email"
                    name="sa-email"
                    type="email"
                    autoComplete="email"
                    aria-describedby="sa-email-hint"
                    required
                />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="sa-phone">
                    Phone number <span className="field__marker">(optional)</span>
                </label>
                <p className="field__hint" id="sa-phone-hint">
                    So we can reach you on the day
                </p>
                <input
                    className="field__input"
                    id="sa-phone"
                    name="sa-phone"
                    type="tel"
                    autoComplete="tel"
                    aria-describedby="sa-phone-hint"
                />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="sa-flight">
                    Flight number
                </label>
                <p className="field__hint" id="sa-flight-hint">
                    For example, MA 204
                </p>
                <input
                    className="field__input"
                    id="sa-flight"
                    name="sa-flight"
                    type="text"
                    aria-describedby="sa-flight-hint"
                    required
                />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="sa-date">
                    Date of flight
                </label>
                <p className="field__hint" id="sa-date-hint">
                    Requests need at least 48 hours&apos; notice
                </p>
                <input
                    className="field__input"
                    id="sa-date"
                    name="sa-date"
                    type="date"
                    aria-describedby="sa-date-hint"
                    required
                />
            </div>
            <fieldset className="fieldset fieldset--inline" aria-describedby="sa-journey-hint">
                <legend className="fieldset__legend">Help needed for</legend>
                <p className="field__hint" id="sa-journey-hint">
                    Choose one
                </p>
                <label className="check">
                    <input className="check__input" type="radio" name="sa-journey" value="departure" required />
                    Departure
                </label>
                <label className="check">
                    <input className="check__input" type="radio" name="sa-journey" value="arrival" required />
                    Arrival
                </label>
                <label className="check">
                    <input className="check__input" type="radio" name="sa-journey" value="both" required />
                    Both
                </label>
            </fieldset>
            <fieldset className="fieldset" aria-describedby="sa-help-hint">
                <legend className="fieldset__legend">What help would you like?</legend>
                <p className="field__hint" id="sa-help-hint">
                    Choose all that apply
                </p>
                <label className="check">
                    <input
                        className="check__input"
                        type="checkbox"
                        name="sa-help-0"
                        value="wheelchair-to-the-aircraft"
                    />
                    Wheelchair to the aircraft
                </label>
                <label className="check">
                    <input
                        className="check__input"
                        type="checkbox"
                        name="sa-help-1"
                        value="help-walking-longer-distances"
                    />
                    Help walking longer distances
                </label>
                <label className="check">
                    <input className="check__input" type="checkbox" name="sa-help-2" value="help-through-security" />
                    Help through security
                </label>
                <label className="check">
                    <input
                        className="check__input"
                        type="checkbox"
                        name="sa-help-3"
                        value="help-for-a-hidden-disability"
                    />
                    Help for a hidden disability
                </label>
                <label className="check">
                    <input className="check__input" type="checkbox" name="sa-help-4" value="help-with-sight-loss" />
                    Help with sight loss
                </label>
                <label className="check">
                    <input className="check__input" type="checkbox" name="sa-help-5" value="help-with-hearing-loss" />
                    Help with hearing loss
                </label>
            </fieldset>
            <fieldset className="fieldset fieldset--inline">
                <legend className="fieldset__legend">Are you bringing your own wheelchair or mobility aid?</legend>

                <label className="check">
                    <input className="check__input" type="radio" name="sa-wheelchair" value="yes" required />
                    Yes
                </label>
                <label className="check">
                    <input className="check__input" type="radio" name="sa-wheelchair" value="no" required />
                    No
                </label>
            </fieldset>
            <div className="field">
                <label className="field__label" htmlFor="sa-notes">
                    Anything else we should know? <span className="field__marker">(optional)</span>
                </label>
                <p className="field__hint" id="sa-notes-hint">
                    For example, an assistance dog or a medical device
                </p>
                <textarea
                    className="field__input field__input--multiline"
                    id="sa-notes"
                    name="sa-notes"
                    rows={5}
                    aria-describedby="sa-notes-hint"
                ></textarea>
            </div>
            <div className="form__actions">
                <button className="button button--lg" type="submit">
                    Send request
                </button>
            </div>
        </form>
    );
}
