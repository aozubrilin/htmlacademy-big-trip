import {getShortDate} from "../utils.js";

const getDestinationTemplate = (events) => {

  if (events.length > 3) {
    return `${events[0].destination} &mdash; ... &mdash; ${events[events.length - 1].destination}`;
  }

  return events.map((event, index) => {
    if (index !== events.length - 1) {
      return `${event.destination} &mdash; `;
    }
    return event.destination;
  }).join(``);
};

const getDateTemplate = (events) => {
  const dateStart = getShortDate(events[0].dateStart);
  const dateEnd = getShortDate(events[events.length - 1].dateEnd);

  return `<p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateEnd}</p>`;
};

const getCost = (events) => events.reduce((eventsPrice, event) =>
  eventsPrice + event.price + event.offers.reduce((offersPrice, offer) =>
    offersPrice + offer.price, 0), 0);

export const createTripInfoTemplate = (events) => {

  const destinationTemplate = getDestinationTemplate(events);
  const dateTemplate = getDateTemplate(events);
  const cost = getCost(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destinationTemplate}</h1>

      <p class="trip-info__dates">${dateTemplate}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  </section>`
  );
};
