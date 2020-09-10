import TripInfoView from "../view/trip-info.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

export default class TripInfo {
  constructor(tripContainer, eventsModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;

    this._tripInfoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const events = this._eventsModel.getEvents().slice();
    const prevTripInfoComponent = this._tripInfoComponent;

    this._tripInfoComponent = new TripInfoView(events);

    if (!prevTripInfoComponent) {
      render(this._tripContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
