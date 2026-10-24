import card from '@/components/card/index.module.css';
import styles from '../index.module.css';

export default function LostProperty() {
    return (
        <form
            className={`${card.root} ${card.padded} ${styles.root} narrow`}
            id="report-lost-item"
            action="/help/baggage-and-lost-property#lost-property"
            method="get"
            aria-labelledby="report-lost-item-title"
        >
            <div className={card.head}>
                <h2 className={card.title} id="report-lost-item-title">
                    Report a lost item
                </h2>
            </div>
            <p className={styles.note}>
                This is a demonstration form for a fictional airport. Please do not enter real personal details. Nothing
                you type is sent anywhere.
            </p>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="lp-name">
                    Full name
                </label>
                <input
                    className={styles.fieldInput}
                    id="lp-name"
                    name="lp-name"
                    type="text"
                    autoComplete="name"
                    required
                />
            </div>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="lp-email">
                    Email address
                </label>
                <p className={styles.fieldHint} id="lp-email-hint">
                    We contact you here if we find a match
                </p>
                <input
                    className={styles.fieldInput}
                    id="lp-email"
                    name="lp-email"
                    type="email"
                    autoComplete="email"
                    aria-describedby="lp-email-hint"
                    required
                />
            </div>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="lp-date">
                    Date you lost it
                </label>
                <input className={styles.fieldInput} id="lp-date" name="lp-date" type="date" required />
            </div>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="lp-where">
                    Where were you?
                </label>
                <select className={styles.fieldInput} id="lp-where" name="lp-where" required>
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
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="lp-place">
                    Where exactly? <span className={styles.fieldMarker}>(optional)</span>
                </label>
                <p className={styles.fieldHint} id="lp-place-hint">
                    For example, security lane 3 or the Skyline Kitchen
                </p>
                <input
                    className={styles.fieldInput}
                    id="lp-place"
                    name="lp-place"
                    type="text"
                    aria-describedby="lp-place-hint"
                />
            </div>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="lp-item">
                    What did you lose?
                </label>
                <p className={styles.fieldHint} id="lp-item-hint">
                    Colour, brand, size and anything inside
                </p>
                <textarea
                    className={`${styles.fieldInput} ${styles.fieldInputMultiline}`}
                    id="lp-item"
                    name="lp-item"
                    rows={5}
                    aria-describedby="lp-item-hint"
                    required
                ></textarea>
            </div>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="lp-flight">
                    Flight number <span className={styles.fieldMarker}>(optional)</span>
                </label>
                <p className={styles.fieldHint} id="lp-flight-hint">
                    If you were flying that day
                </p>
                <input
                    className={styles.fieldInput}
                    id="lp-flight"
                    name="lp-flight"
                    type="text"
                    aria-describedby="lp-flight-hint"
                />
            </div>
            <div className={styles.actions}>
                <button className="button button--lg" type="submit">
                    Report lost item
                </button>
            </div>
        </form>
    );
}
