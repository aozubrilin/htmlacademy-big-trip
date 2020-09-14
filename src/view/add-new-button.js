import SmartView from "./smart.js";

export default class AddNewButton extends SmartView {
  constructor(isEnabled) {
    super();
    this._data.isEnabled = isEnabled;
    this._clickNewButtonHandler = this._clickNewButtonHandler.bind(this);
  }

  getTemplate() {
    return (
      `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
       type="button"
       ${this._data.isEnabled ? `disabled` : ``}>New event</button>`
    );
  }

  restoreHandlers() {
    this.getElement().addEventListener(`click`, this._clickNewButtonHandler);
  }

  disabledButton() {
    this.updateData({
      isEnabled: !this._data.isEnabled
    }, false);
  }

  setClickHandler(callback) {
    this._callback.buttonClick = callback;
    this.getElement().addEventListener(`click`, this._clickNewButtonHandler);
  }

  _clickNewButtonHandler(evt) {
    evt.preventDefault();
    this._callback.buttonClick();
    this.updateData({isEnabled: !this._data.isEnabled}, false);
  }
}
