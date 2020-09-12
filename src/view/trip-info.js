import AbstractView from "./abstract.js";
import {getShortDate} from "../utils/event.js";

const getDateTemplate = (events, sortedEventsByDateEnd) => {
  const dateStart = getShortDate(events[0].dateStart);
  const dateEnd = getShortDate(sortedEventsByDateEnd[events.length - 1].dateEnd);

  return `<p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateEnd}</p>`;
};

const getCost = (events) => events.reduce((eventsPrice, event) =>
  eventsPrice + event.price + (event.offers !== null ? (event.offers.reduce((offersPrice, offer) =>
    offersPrice + offer.price, 0)) : 0), 0);

export default class TripInfo extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {

    if (!this._events.length) {
      return (
        `<section class="trip-main__trip-info  trip-info">
          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
          </p>
        </section>`
      );
    }

    const sortedEventsByDateEnd = this._events.sort((dateEndA, dateEndB) => dateEndA.dateEnd - dateEndB.dateEnd);

    return (
      `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">@@@Chtobi Ne Zabil@@@</h1>
          ${getDateTemplate(this._events, sortedEventsByDateEnd)}
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${getCost(this._events)}</span>
        </p>
      </section>`
    );
  }
}
