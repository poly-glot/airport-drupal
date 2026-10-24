export default function Feedback() {
  return (
    <form className="card card--padded form narrow" id="feedback" action="/help#feedback" method="get" aria-labelledby="feedback-title">
    <div className="card__head">
    <h2 className="card__title" id="feedback-title">Send us feedback</h2>
    <p className="card__text">Tell us what went well and what did not. We read every message and use them to decide what to fix first. If you would like a reply, leave your email address.</p>
    </div>
    <p className="form__note">This is a demonstration form for a fictional airport. Please do not enter real personal details. Nothing you type is sent anywhere.</p>
    <div className="field"><label className="field__label" htmlFor="fb-name">Your name <span className="field__marker">(optional)</span></label><input className="field__input" id="fb-name" name="fb-name" type="text" autoComplete="name" /></div>
    <div className="field"><label className="field__label" htmlFor="fb-email">Email address <span className="field__marker">(optional)</span></label><p className="field__hint" id="fb-email-hint">Only if you would like a reply</p><input className="field__input" id="fb-email" name="fb-email" type="email" autoComplete="email" aria-describedby="fb-email-hint" /></div>
    <div className="field"><label className="field__label" htmlFor="fb-topic">What is it about?</label><select className="field__input" id="fb-topic" name="fb-topic" required><option value="">Choose a topic</option><option value="security">Security</option><option value="parking">Parking</option><option value="shops-and-restaurants">Shops and restaurants</option><option value="cleanliness">Cleanliness</option><option value="special-assistance">Special assistance</option><option value="getting-here">Getting here</option><option value="something-else">Something else</option></select></div>
    <fieldset className="fieldset fieldset--inline">
    <legend className="fieldset__legend">Which terminal?</legend>

    <label className="check"><input className="check__input" type="radio" name="fb-terminal" value="terminal-1" required />Terminal 1</label><label className="check"><input className="check__input" type="radio" name="fb-terminal" value="terminal-2" required />Terminal 2</label><label className="check"><input className="check__input" type="radio" name="fb-terminal" value="both" required />Both</label><label className="check"><input className="check__input" type="radio" name="fb-terminal" value="not-sure" required />Not sure</label>
    </fieldset>
    <div className="field"><label className="field__label" htmlFor="fb-date">Date of your visit <span className="field__marker">(optional)</span></label><input className="field__input" id="fb-date" name="fb-date" type="date" /></div>
    <div className="field"><label className="field__label" htmlFor="fb-message">Your feedback</label><p className="field__hint" id="fb-message-hint">Tell us what happened and what we could do better</p><textarea className="field__input field__input--multiline" id="fb-message" name="fb-message" rows={5} aria-describedby="fb-message-hint" required></textarea></div>
    <div className="form__actions">
    <button className="button button--lg" type="submit">Send feedback</button>
    </div>
    </form>
  );
}
