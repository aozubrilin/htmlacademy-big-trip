import Abstarct from "./abstract.js";

export default class Loading extends Abstarct {
  constructor(isDataAvailble) {
    super();
    this._isDataAvailble = isDataAvailble;
  }
  getTemplate() {
    return (`<p class="trip-events__msg">
    ${this._isDataAvailble ?
        `Loading...` : `Service Temporarily Unavailable.`}
    </p>`);
  }
}
