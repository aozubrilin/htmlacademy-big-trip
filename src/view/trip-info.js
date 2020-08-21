import {getShortDate, createElement} from "../utils.js";

const getDateTemplate = (events, eventsByDateEnd) => {
  const dateStart = getShortDate(events[0].dateStart);
  const dateEnd = getShortDate(eventsByDateEnd[events.length - 1].dateEnd);

  return events.length ? `<p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateEnd}</p>` : 0;
};

const getCost = (events) => events.reduce((eventsPrice, event) =>
  eventsPrice + event.price + (event.offers !== null ? (event.offers.reduce((offersPrice, offer) =>
    offersPrice + offer.price, 0)) : 0), 0);

const createTripInfoTemplate = (events) => {
  const eventsByDateEnd = events.slice(0).sort((current, next) => current.dateEnd - next.dateEnd);
  const dateTemplate = events.length ? getDateTemplate(events, eventsByDateEnd) : ``;
  const cost = getCost(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">@@@Chtobi Ne Zabil@@@</h1>
         ${dateTemplate }
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  </section>`
  );
};

export default class TripInfo {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
