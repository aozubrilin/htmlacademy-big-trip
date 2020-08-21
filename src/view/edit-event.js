import {EVENT_TYPES, Destination} from '../const.js';
import {addOptions} from "../mock/offers.js";
import {getDateThroughSlahs, createEventTitleType, createElement} from "../utils.js";

const BLANK_EVENT = {
  type: `Taxi`,
  destination: `Chamonix`,
  dateStart: new Date(),
  dateEnd: new Date(),
  price: 0,
  offers: [],
  destinationInfo: ``,
  favorit: false
};

const createTypeListTemplate = (types, currentType) => {
  return types.map((type, index) => `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-${index + 1}" class="event__type-input  visually-hidden" type="radio"
      name="event-type" value="${type.toLowerCase()}"  ${currentType === type ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}"
      for="event-type-${type.toLowerCase()}-${index + 1}">${type}</label>
      </div>`).join(`\n`);
};

const createDestinationListTemplate = (destinations) => {

  return destinations.map((item) => `<option value="${item}"></option>`).join(``);
};

const createOffersTemplate = (eventOffers, eventType) => {
  return addOptions
    .filter((offer) => offer.type === eventType)[0]
    .offers.map((it, index) =>`<div class="event__offer-selector">
                          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.lable}-${index + 1}"
                            type="checkbox" name="event-offer-${it.lable}" ${ eventOffers.includes(it) ? `checked` : ``}>
                           <label class="event__offer-label" for="event-offer-${it.lable}-${index + 1}">
                            <span class="event__offer-title">${it.title}</span>
                            &plus;
                            &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
                            </label>
                         </div>`).join(`\n`);
};

const createOffersTemplateEL = (eventOffers, eventType) => {

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">${createOffersTemplate(eventOffers, eventType)}</div>
          </section>`;
};

const createDestinationInfoTemplate = (destinationInfo) => {
  const photoTemlate = destinationInfo.photos.map((photo) =>`<img class="event__photo" ${photo} alt="Event photo"></img>`).join(`\n`);
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destinationInfo.description}</p>
  <div class="event__photos-container">
    <div class="event__photos-tape">
    ${photoTemlate}
    </div>
  </div>
</section>`;
};

const createEventEditTemplate = (event = {}) => {
  const {type, destination, price, offers, dateStart, destinationInfo, dateEnd, favorit} = event;

  const transferListTemplate = createTypeListTemplate(EVENT_TYPES.transfers, type);
  const actionsListTemplate = createTypeListTemplate(EVENT_TYPES.actions, type);
  const eventTitleType = createEventTitleType(type);
  const destinationListTemplate = createDestinationListTemplate(Destination.CITIES);
  const lengthAddOptionsForType = addOptions.filter((offer) => offer.type === type)[0].offers.length;
  const offersTemplate = createOffersTemplateEL(offers, type);
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
         <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
          ${transferListTemplate}
        </fieldset>
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
          ${actionsListTemplate}
        </fieldset>
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
         ${lengthAddOptionsForType ? offersTemplate : ``}
         ${destinationInfoTemplate}
      </section>

    </form>
  </li>`
  );
};

export default class EditEvent {
  constructor(event = Object.assign({}, BLANK_EVENT)) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
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
