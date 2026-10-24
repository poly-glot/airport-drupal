export default function Parking({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <form className="card card--padded form photo-band__form on-light" action="/parking#quote" method="get" aria-labelledby="book-parking-title">
        <div className="card__head">
          <h3 className="card__title" id="book-parking-title">Book parking</h3>
          <p className="card__text">Choose a car park, then your dates.</p>
        </div>
        <fieldset className="fieldset">
          <legend className="fieldset__legend">Car park</legend>
          <label className="choice"><input className="check__input" type="radio" name="carpark" value="p1" /><span className="choice__text"><span className="choice__title">P1 Short-stay</span><span className="choice__meta">2 min walk · pick-up and drop-off</span></span><span className="choice__price">from £4 / hr</span></label>
          <label className="choice"><input className="check__input" type="radio" name="carpark" value="p2" defaultChecked /><span className="choice__text"><span className="choice__title">P2 Long-stay</span><span className="choice__meta">5 min walk · covered</span></span><span className="choice__price">from £8.50 / day</span></label>
          <label className="choice"><input className="check__input" type="radio" name="carpark" value="mid-stay" /><span className="choice__text"><span className="choice__title">Mid-Stay</span><span className="choice__meta">8 min shuttle · 10 min free wait</span></span><span className="choice__price">from £12 / day</span></label>
        </fieldset>
        <div className="field-grid form__rule">
          <div className="field"><label className="field__label field__label--caps" htmlFor="park-in">Arrive</label><input className="field__input" id="park-in" name="arrive" type="date" /></div>
          <div className="field"><label className="field__label field__label--caps" htmlFor="park-out">Return</label><input className="field__input" id="park-out" name="return" type="date" /></div>
        </div>
        <button className="button button--lg button--block" type="submit">Check prices and availability</button>
        <p className="form__small">No payment until you confirm. Free cancellation up to 24 hours before arrival.</p>
      </form>
    );
  }

  return (
    <form className="card card--padded form photo-band__form on-light" id="quote" action="/parking#quote" method="get" aria-labelledby="quote-title">
    <div className="card__head">
      <h2 className="card__title" id="quote-title">Book parking</h2>
      <p className="card__text">Choose a car park, then your dates.</p>
    </div>
    <p className="form__note">This is a demonstration form for a fictional airport. No booking is made and nothing is charged.</p>
    <fieldset className="fieldset">
      <legend className="fieldset__legend">Car park <span className="field__marker">(required)</span></legend>
      <label className="choice"><input className="check__input" type="radio" name="carpark" value="p1" required /><span className="choice__text"><span className="choice__title">P1 Short-stay</span><span className="choice__meta">2 min walk · pick-up and drop-off</span></span><span className="choice__price">from £4 / hr</span></label>
      <label className="choice"><input className="check__input" type="radio" name="carpark" value="p2" defaultChecked /><span className="choice__text"><span className="choice__title">P2 Long-stay</span><span className="choice__meta">5 min walk · covered</span></span><span className="choice__price">from £8.50 / day</span></label>
      <label className="choice"><input className="check__input" type="radio" name="carpark" value="mid-stay" /><span className="choice__text"><span className="choice__title">Mid-Stay</span><span className="choice__meta">8 min shuttle · 10 min free wait</span></span><span className="choice__price">from £12 / day</span></label>
    </fieldset>
    <div className="field-grid form__rule">
      <div className="field"><label className="field__label field__label--caps" htmlFor="arrive">Arrive</label><input className="field__input" id="arrive" name="arrive" type="date" required /></div>
      <div className="field"><label className="field__label field__label--caps" htmlFor="return">Return</label><input className="field__input" id="return" name="return" type="date" required /></div>
    </div>
    <div className="form__actions">
      <button className="button button--lg" type="submit">Check prices and availability</button>
    </div>
    <p className="form__small">No payment until you confirm. Free cancellation up to 24 hours before arrival.</p>
    </form>
  );
}
