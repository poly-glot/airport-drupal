import card from '@/components/card/index.module.css';
import photoBand from '@/components/photo-band/index.module.css';
import styles from '../index.module.css';

export default function Parking({ compact }: { compact?: boolean }) {
    if (compact) {
        return (
            <form
                className={`${card.root} ${card.padded} ${styles.root} ${photoBand.form} on-light`}
                action="/parking#quote"
                method="get"
                aria-labelledby="book-parking-title"
            >
                <div className={card.head}>
                    <h3 className={card.title} id="book-parking-title">
                        Book parking
                    </h3>
                    <p className={card.text}>Choose a car park, then your dates.</p>
                </div>
                <fieldset className={styles.fieldset}>
                    <legend className={styles.fieldsetLegend}>Car park</legend>
                    <label className={styles.choice}>
                        <input className={styles.checkInput} type="radio" name="carpark" value="p1" />
                        <span className={styles.choiceText}>
                            <span className={styles.choiceTitle}>P1 Short-stay</span>
                            <span className={styles.choiceMeta}>2 min walk · pick-up and drop-off</span>
                        </span>
                        <span className={styles.choicePrice}>from £4 / hr</span>
                    </label>
                    <label className={styles.choice}>
                        <input className={styles.checkInput} type="radio" name="carpark" value="p2" defaultChecked />
                        <span className={styles.choiceText}>
                            <span className={styles.choiceTitle}>P2 Long-stay</span>
                            <span className={styles.choiceMeta}>5 min walk · covered</span>
                        </span>
                        <span className={styles.choicePrice}>from £8.50 / day</span>
                    </label>
                    <label className={styles.choice}>
                        <input className={styles.checkInput} type="radio" name="carpark" value="mid-stay" />
                        <span className={styles.choiceText}>
                            <span className={styles.choiceTitle}>Mid-Stay</span>
                            <span className={styles.choiceMeta}>8 min shuttle · 10 min free wait</span>
                        </span>
                        <span className={styles.choicePrice}>from £12 / day</span>
                    </label>
                </fieldset>
                <div className={`${styles.fieldGrid} ${styles.rule}`}>
                    <div className={styles.field}>
                        <label className={`${styles.fieldLabel} ${styles.fieldLabelCaps}`} htmlFor="park-in">
                            Arrive
                        </label>
                        <input className={styles.fieldInput} id="park-in" name="arrive" type="date" />
                    </div>
                    <div className={styles.field}>
                        <label className={`${styles.fieldLabel} ${styles.fieldLabelCaps}`} htmlFor="park-out">
                            Return
                        </label>
                        <input className={styles.fieldInput} id="park-out" name="return" type="date" />
                    </div>
                </div>
                <button className="button button--lg button--block" type="submit">
                    Check prices and availability
                </button>
                <p className={styles.small}>
                    No payment until you confirm. Free cancellation up to 24 hours before arrival.
                </p>
            </form>
        );
    }

    return (
        <form
            className={`${card.root} ${card.padded} ${styles.root} ${photoBand.form} on-light`}
            id="quote"
            action="/parking#quote"
            method="get"
            aria-labelledby="quote-title"
        >
            <div className={card.head}>
                <h2 className={card.title} id="quote-title">
                    Book parking
                </h2>
                <p className={card.text}>Choose a car park, then your dates.</p>
            </div>
            <p className={styles.note}>
                This is a demonstration form for a fictional airport. No booking is made and nothing is charged.
            </p>
            <fieldset className={styles.fieldset}>
                <legend className={styles.fieldsetLegend}>
                    Car park <span className={styles.fieldMarker}>(required)</span>
                </legend>
                <label className={styles.choice}>
                    <input className={styles.checkInput} type="radio" name="carpark" value="p1" required />
                    <span className={styles.choiceText}>
                        <span className={styles.choiceTitle}>P1 Short-stay</span>
                        <span className={styles.choiceMeta}>2 min walk · pick-up and drop-off</span>
                    </span>
                    <span className={styles.choicePrice}>from £4 / hr</span>
                </label>
                <label className={styles.choice}>
                    <input className={styles.checkInput} type="radio" name="carpark" value="p2" defaultChecked />
                    <span className={styles.choiceText}>
                        <span className={styles.choiceTitle}>P2 Long-stay</span>
                        <span className={styles.choiceMeta}>5 min walk · covered</span>
                    </span>
                    <span className={styles.choicePrice}>from £8.50 / day</span>
                </label>
                <label className={styles.choice}>
                    <input className={styles.checkInput} type="radio" name="carpark" value="mid-stay" />
                    <span className={styles.choiceText}>
                        <span className={styles.choiceTitle}>Mid-Stay</span>
                        <span className={styles.choiceMeta}>8 min shuttle · 10 min free wait</span>
                    </span>
                    <span className={styles.choicePrice}>from £12 / day</span>
                </label>
            </fieldset>
            <div className={`${styles.fieldGrid} ${styles.rule}`}>
                <div className={styles.field}>
                    <label className={`${styles.fieldLabel} ${styles.fieldLabelCaps}`} htmlFor="arrive">
                        Arrive
                    </label>
                    <input className={styles.fieldInput} id="arrive" name="arrive" type="date" required />
                </div>
                <div className={styles.field}>
                    <label className={`${styles.fieldLabel} ${styles.fieldLabelCaps}`} htmlFor="return">
                        Return
                    </label>
                    <input className={styles.fieldInput} id="return" name="return" type="date" required />
                </div>
            </div>
            <div className={styles.actions}>
                <button className="button button--lg" type="submit">
                    Check prices and availability
                </button>
            </div>
            <p className={styles.small}>
                No payment until you confirm. Free cancellation up to 24 hours before arrival.
            </p>
        </form>
    );
}
