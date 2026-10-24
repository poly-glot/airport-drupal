import card from '@/components/card/index.module.css';
import styles from '../index.module.css';

export default function Feedback() {
    return (
        <form
            className={`${card.root} ${card.padded} ${styles.root} narrow`}
            id="feedback"
            action="/help#feedback"
            method="get"
            aria-labelledby="feedback-title"
        >
            <div className={card.head}>
                <h2 className={card.title} id="feedback-title">
                    Send us feedback
                </h2>
                <p className={card.text}>
                    Tell us what went well and what did not. We read every message and use them to decide what to fix
                    first. If you would like a reply, leave your email address.
                </p>
            </div>
            <p className={styles.note}>
                This is a demonstration form for a fictional airport. Please do not enter real personal details. Nothing
                you type is sent anywhere.
            </p>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="fb-name">
                    Your name <span className={styles.fieldMarker}>(optional)</span>
                </label>
                <input className={styles.fieldInput} id="fb-name" name="fb-name" type="text" autoComplete="name" />
            </div>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="fb-email">
                    Email address <span className={styles.fieldMarker}>(optional)</span>
                </label>
                <p className={styles.fieldHint} id="fb-email-hint">
                    Only if you would like a reply
                </p>
                <input
                    className={styles.fieldInput}
                    id="fb-email"
                    name="fb-email"
                    type="email"
                    autoComplete="email"
                    aria-describedby="fb-email-hint"
                />
            </div>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="fb-topic">
                    What is it about?
                </label>
                <select className={styles.fieldInput} id="fb-topic" name="fb-topic" required>
                    <option value="">Choose a topic</option>
                    <option value="security">Security</option>
                    <option value="parking">Parking</option>
                    <option value="shops-and-restaurants">Shops and restaurants</option>
                    <option value="cleanliness">Cleanliness</option>
                    <option value="special-assistance">Special assistance</option>
                    <option value="getting-here">Getting here</option>
                    <option value="something-else">Something else</option>
                </select>
            </div>
            <fieldset className={`${styles.fieldset} ${styles.fieldsetInline}`}>
                <legend className={styles.fieldsetLegend}>Which terminal?</legend>

                <label className={styles.check}>
                    <input className={styles.checkInput} type="radio" name="fb-terminal" value="terminal-1" required />
                    Terminal 1
                </label>
                <label className={styles.check}>
                    <input className={styles.checkInput} type="radio" name="fb-terminal" value="terminal-2" required />
                    Terminal 2
                </label>
                <label className={styles.check}>
                    <input className={styles.checkInput} type="radio" name="fb-terminal" value="both" required />
                    Both
                </label>
                <label className={styles.check}>
                    <input className={styles.checkInput} type="radio" name="fb-terminal" value="not-sure" required />
                    Not sure
                </label>
            </fieldset>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="fb-date">
                    Date of your visit <span className={styles.fieldMarker}>(optional)</span>
                </label>
                <input className={styles.fieldInput} id="fb-date" name="fb-date" type="date" />
            </div>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="fb-message">
                    Your feedback
                </label>
                <p className={styles.fieldHint} id="fb-message-hint">
                    Tell us what happened and what we could do better
                </p>
                <textarea
                    className={`${styles.fieldInput} ${styles.fieldInputMultiline}`}
                    id="fb-message"
                    name="fb-message"
                    rows={5}
                    aria-describedby="fb-message-hint"
                    required
                ></textarea>
            </div>
            <div className={styles.actions}>
                <button className="button button--lg" type="submit">
                    Send feedback
                </button>
            </div>
        </form>
    );
}
