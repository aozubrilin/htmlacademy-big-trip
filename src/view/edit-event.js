import SmartView from "./smart.js";
import {EVENT_TYPES, Destination} from '../const.js';
import {getDateThroughSlahs, createEventTitleType} from "../utils/event.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";


const BLANK_EVENT = {
  type: `Taxi`,
  destination: `Chamonix`,
  dateStart: new Date(),
  dateEnd: new Date(),
  price: 0,
  offers: [],
  destinationInfo: ``,
  isFavorite: false
};

const createTypeListTemplate = (types, currentType) => {
  return types.map((type, index) => `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-${index + 1}" class="event__type-input  visually-hidden" type="radio"
      name="event-type" value="${type.toLowerCase()}" data-type="${type}" ${currentType === type ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}"
      for="event-type-${type.toLowerCase()}-${index + 1}">${type}</label>
      </div>`).join(`\n`);
};

const createDestinationListTemplate = (destinations) => {

  return destinations.map((item) => `<option value="${item}"></option>`).join(``);
};

const createOfferItemsTemplate = (options, eventType, event) => {

  return options
    .find((offer) => offer.type === eventType)
    .offers.map((it, index) =>`<div class="event__offer-selector">
                          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.lable}-${index + 1}"
                            type="checkbox" name="event-offer-${it.lable}" ${event.offers.includes(it) ? `checked` : ``}>
                           <label class="event__offer-label" for="event-offer-${it.lable}-${index + 1}">
                            <span class="event__offer-title">${it.title}</span>
                            &plus;
                            &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
                            </label>
                         </div>`).join(`\n`);
};

const createOffersTemplate = (offers, eventType, event) => {

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">${createOfferItemsTemplate(offers, eventType, event)}</div>
          </section>`;
};

const createDestinationInfoTemplate = (destination, items) => {
  const currentDestination = items.find((it) => it.city === destination);
  const photoTemlate = currentDestination.destinationInfo.photos.map((photo) =>`<img class="event__photo" ${photo} alt="Event photo"></img>`).join(`\n`);

  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${currentDestination.destinationInfo.description}</p>
  <div class="event__photos-container">
    <div class="event__photos-tape">
    ${photoTemlate}
    </div>
  </div>
</section>`;
};

const createEventEditTemplate = (event = {}, options, destinations) => {
  const {price, dateStart, dateEnd, isFavorite, type, destination} = event;
  const transferListTemplate = createTypeListTemplate(EVENT_TYPES.transfers, type);
  const actionsListTemplate = createTypeListTemplate(EVENT_TYPES.actions, type);
  const eventTitleType = createEventTitleType(type);
  const destinationListTemplate = createDestinationListTemplate(Destination.CITIES);
  const lengthAddOptionsForType = options.find((offer) => offer.type === type).offers.length;
  const offersTemplate = createOffersTemplate(options, type, event);
  const destinationInfoTemplate = createDestinationInfoTemplate(destination, destinations);
  const startTime = getDateThroughSlahs(dateStart);
  const endTime = getDateThroughSlahs(dateEnd);
  const checkedisFavorite = (!isFavorite) ? `` : `checked`;

  return (
    `<li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type.toLowerCase()} icon">
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

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${checkedisFavorite}>
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

export default class EditEvent extends SmartView {
  constructor(event = Object.assign({}, BLANK_EVENT), options, destinations) {
    super();
    this._data = EditEvent.parseEventToData(event);
    this._options = options;
    this._destinations = destinations;
    this._datepickers = null;

    this._submitForm = this._submitForm.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._dateChangeHandler = this._dateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatePicker();
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._options, this._destinations);
  }

  _setDatePicker() {
    if (this._datepickers) {
      this._datepickers.forEach((item) => item.destroy());
      this._datepickers = null;
    }

    const eventStartTime = flatpickr(
        this.getElement().querySelector(`.event__input--time[name="event-start-time"]`),
        {
          enableTime: true,
          // eslint-disable-next-line camelcase
          time_24hr: true,
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.dateStart,
          onChange: this._dateChangeHandler
        }
    );

    const eventEndTime = flatpickr(
        this.getElement().querySelector(`.event__input--time[name="event-end-time"]`),
        {
          enableTime: true,
          // eslint-disable-next-line camelcase
          time_24hr: true,
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.dateEnd,
          minDate: this._data.dateStart,
          onChange: this._dateChangeHandler
        }
    );

    this._datepickers = [eventStartTime, eventEndTime];
  }

  _dateChangeHandler([userDate], str, picker) {

    if (picker === this._datepickers[0]) {
      if (userDate > this._datepickers[1].latestSelectedDateObj) {
        this.updateData({
          dateStart: userDate,
          dateEnd: userDate
        }, true);
      }

      this.updateData({
        dateStart: userDate
      }, true);

    } else {
      this.updateData({
        dateEnd: userDate
      }, true);
    }
  }

  reset(event) {
    this.updateData(EditEvent.parseEventToData(event));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatePicker();
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setSubmitFormHandler(this._callback._submitForm);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeChangeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.dataset.type
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value
    });
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._callback._submitForm(EditEvent.parseDataToEvent(this._data));
  }

  setSubmitFormHandler(callback) {
    this._callback._submitForm = callback;
    this.getElement().addEventListener(`submit`, this._submitForm);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
  }

  setdeletelickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign({}, event);
  }

  static parseDataToEvent(data) {
    return Object.assign({}, data);
  }
}
