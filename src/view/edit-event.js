import {EVENT_TYPES, DESTINATIONS} from '../const.js';
import {getDateThroughSlahs, createEventTitleType} from "../utils.js";

const createTypeListTemplate = (currentType) => {

  return Object.entries(EVENT_TYPES).map(([types, typeItems]) => `<fieldset class="event__type-group"><legend class="visually-hidden">${types}</legend>`
    + typeItems.map((item) => `<div class="event__type-${item.toLowerCase()}">
  <input id="event-type-${item.toLowerCase()}-1"
  class="event__type-input  visually-hidden"
  type="radio" name="event-type"
  value="${item.toLowerCase()}"
  ${currentType === item ? `checked` : ``}>
  <label class="event__type-label event__type-label--${item.toLowerCase()}" for="event-type-item-1">${item}</label></div>`).join(``)).join(`</fieldset>`);
};

const createDestinationListTemplate = (destinations) => {

  return destinations.map((item) => `<option value="${item}"></option>`).join(``);
};

const createOffersTemplate = (Offers) => {
  return Offers.length !== 0 ? `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
   ${Offers.map((item) => `<div class="event__available-offers">
    <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.type}-1" type="checkbox" name="event-offer-${item.type}" checked>
    <label class="event__offer-label" for="event-offer-${item.type}-1">
    <span class="event__offer-title">${item.title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
  </label></div>`).join(``)} </section>` : ``;
};

const createDestinationInfoTemplate = (destinationInfo) => {

  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destinationInfo.description}</p>
  <div class="event__photos-container">
    <div class="event__photos-tape">
    ${destinationInfo.photo}
    </div>
  </div>
</section>`;
};


export const createEventEditTemplate = (event = {}) => {
  const {
    type = `Taxi`,
    destination = `Chamonix`,
    dateStart = new Date(),
    dateEnd = new Date(),
    price = 0,
    offers = ``,
    destinationInfo,
    favorit
  } = event;

  const typeListTemplate = createTypeListTemplate(type);
  const eventTitleType = createEventTitleType(type);
  const destinationListTemplate = createDestinationListTemplate(DESTINATIONS);
  const OffersTemplate = createOffersTemplate(offers);
  const destinationInfoTemplate = createDestinationInfoTemplate(destinationInfo);
  const startTime = getDateThroughSlahs(dateStart);
  const endTime = getDateThroughSlahs(dateEnd);
  const checkedFavorit = (!favorit) ? `` : `checked`;

  return (
    `<li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
           ${typeListTemplate}
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${eventTitleType}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${destinationListTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${checkedFavorit}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
         ${OffersTemplate}
         ${destinationInfoTemplate}
      </section>

    </form>
  </li>`
  );
};
