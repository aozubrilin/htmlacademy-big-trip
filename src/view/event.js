import {EVENT_TYPES} from '../const.js';
import {getDateTime, getDuration} from "../utils.js";
const createOfferTemplate = (offer) => {

  return offer !== null ? offer.slice(0, 3).map((offerItem) =>
    `<li class="event__offer">
        <span class="event__offer-title">${offerItem.title}</span>
        &plus;&nbsp;&euro;&nbsp;<span class="event__offer-price">${offerItem.price}</span>
        </li>`).join(``) : ``;
};

export const createEventTemplate = (event) => {
  const {type, city, price, offer, dateStart, dateEnd} = event;

  const eventTitleType = EVENT_TYPES.actions.includes(type) ? `${type} in` : `${type} to`;
  const offerTemplate = createOfferTemplate(offer);
  const startDateTime = getDateTime(dateStart);
  const endDateTime = getDateTime(dateEnd);
  const duration = getDuration(dateStart, dateEnd);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
      </div>
      <h3 class="event__title">${eventTitleType} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDateTime}">${startDateTime.slice(-5)}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDateTime}">${endDateTime.slice(-5)}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${offerTemplate}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};
