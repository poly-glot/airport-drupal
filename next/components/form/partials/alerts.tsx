import card from '@/components/card/index.module.css';
import styles from '../index.module.css';

export default function Alerts() {
    return (
        <form
            className={`${card.root} ${card.padded} ${styles.root} narrow`}
            id="set-up-alerts"
            action="/flights/alerts"
            method="get"
            aria-labelledby="set-up-alerts-title"
        >
            <div className={card.head}>
                <h2 className={card.title} id="set-up-alerts-title">
                    Set up alerts
                </h2>
            </div>
            <p className={styles.note}>
                This is a demonstration form for a fictional airport. Please do not enter real personal details. Nothing
                you type is sent anywhere.
            </p>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="flight">
                    Flight number <span className={styles.fieldMarker}>(required)</span>
                </label>
                <p className={styles.fieldHint} id="flight-hint">
                    For example, MA 204. It is on your booking confirmation.
                </p>
                <input
                    className={styles.fieldInput}
                    id="flight"
                    name="flight"
                    type="text"
                    autoComplete="off"
                    aria-describedby="flight-hint"
                    required
                />
            </div>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="flight-date">
                    Date of flight <span className={styles.fieldMarker}>(required)</span>
                </label>
                <input className={styles.fieldInput} id="flight-date" name="date" type="date" required />
            </div>
            <fieldset className={`${styles.fieldset} ${styles.fieldsetInline}`} aria-describedby="channel-hint">
                <legend className={styles.fieldsetLegend}>
                    How should we send alerts? <span className={styles.fieldMarker}>(required)</span>
                </legend>
                <p className={styles.fieldHint} id="channel-hint">
                    Choose one
                </p>
                <label className={styles.check}>
                    <input className={styles.checkInput} type="radio" name="channel" value="text" required />
                    Text message
                </label>
                <label className={styles.check}>
                    <input className={styles.checkInput} type="radio" name="channel" value="whatsapp" />
                    WhatsApp
                </label>
            </fieldset>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="mobile">
                    Mobile number <span className={styles.fieldMarker}>(required)</span>
                </label>
                <p className={styles.fieldHint} id="mobile-hint">
                    A UK or international number, starting with 0 or +
                </p>
                <input
                    className={styles.fieldInput}
                    id="mobile"
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    aria-describedby="mobile-hint"
                    required
                />
            </div>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="email">
                    Email address <span className={styles.fieldMarker}>(optional)</span>
                </label>
                <p className={styles.fieldHint} id="email-hint">
                    We send a copy of each alert here too
                </p>
                <input
                    className={styles.fieldInput}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-describedby="email-hint"
                />
            </div>
            <fieldset className={styles.fieldset} aria-describedby="which-hint">
                <legend className={styles.fieldsetLegend}>
                    Which alerts do you want? <span className={styles.fieldMarker}>(required)</span>
                </legend>
                <p className={styles.fieldHint} id="which-hint">
                    Choose all that apply
                </p>
                <label className={styles.check}>
                    <input className={styles.checkInput} type="checkbox" name="alert-gate" value="yes" />
                    Gate changes
                </label>
                <label className={styles.check}>
                    <input className={styles.checkInput} type="checkbox" name="alert-delays" value="yes" />
                    Delays and cancellations
                </label>
                <label className={styles.check}>
                    <input className={styles.checkInput} type="checkbox" name="alert-boarding" value="yes" />
                    Boarding calls
                </label>
                <label className={styles.check}>
                    <input className={styles.checkInput} type="checkbox" name="alert-bags" value="yes" />
                    Bags on the belt (arrivals only)
                </label>
            </fieldset>
            <div className={styles.field}>
                <label className={styles.check}>
                    <input
                        className={styles.checkInput}
                        type="checkbox"
                        name="consent"
                        value="yes"
                        aria-describedby="consent-hint"
                        required
                    />
                    I agree to receive alerts about this flight <span className={styles.fieldMarker}>(required)</span>
                </label>
                <p className={styles.fieldHint} id="consent-hint">
                    Alerts stop 2 hours after the flight lands or departs
                </p>
            </div>
            <div className={styles.actions}>
                <button className="button button--lg" type="submit">
                    Sign up for alerts
                </button>
            </div>
        </form>
    );
}
