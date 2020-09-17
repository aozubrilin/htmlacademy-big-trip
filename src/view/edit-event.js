import he from "he";
import SmartView from "./smart.js";
import {EVENT_TYPES} from "../const.js";
import {getDateThroughSlahs, createEventTitleType, transformToFirstCapitalize} from "../utils/event.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const FLATPICKR_PROPERTIES = {
  'time_24hr': true,
  'dateFormat': `d/m/Y H:i`,
  'enableTime': true,
};

const BLANK_EVENT = {
  type: EVENT_TYPES.transfers[0],
  destination: {
    name: ``,
    description: ``,
    pictures: []
  },
  dateStart: new Date(),
  dateEnd: new Date(),
  price: 0,
  offers: [],
  isFavorite: false
};

const createTypeListTemplate = (types, currentType) => {
  return types.map((type, index) => `<div class="event__type-item">
      <input id="event-type-${type}-${index + 1}" class="event__type-input  visually-hidden" type="radio"
      name="event-type" value="${type}" data-type="${type}" ${currentType === type ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${type}"
      for="event-type-${type}-${index + 1}">${transformToFirstCapitalize(type)}</label>
      </div>`).join(`\n`);
};

const createDestinationListTemplate = (destinations) => {

  return destinations.map((item) =>`<option value="${item.name}"></option>`).join(``);
};

const getCurrentOffers = (offers) => {
  const currentOffersTitle = new Set();

  for (const offer of offers) {
    currentOffersTitle.add(offer.title);
  }

  return currentOffersTitle;
};

const createOfferItemsTemplate = (options, eventType, event, isDisabled) => {
  const currentOffers = getCurrentOffers(event.offers);

  return options
    .find((offer) => offer.type === eventType)
    .offers.map((it) => {
      const id = it.title.toLowerCase().split(` `).join(`-`);

      return (`<div class="event__offer-selector">
                          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-${event.id}"
                            type="checkbox" name="event-offer-${id}" data-title="${it.title}"
                            data-price="${it.price}" ${currentOffers.has(it.title) ? `checked` : ``}
                            ${isDisabled ? `disabled` : ``}
                            >
                           <label class="event__offer-label" for="event-offer-${id}-${event.id}">
                            <span class="event__offer-title">${it.title}</span>
                            &plus;
                            &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
                            </label>
                         </div>`);
    }).join(`\n`);
};

const createOffersTemplate = (offers, eventType, event, isDisabled) => {
  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">${createOfferItemsTemplate(offers, eventType, event, isDisabled)}</div>
          </section>`;
};

const isDestinationsAvailable = (destination) => {
  return destination !== null && destination.name !== ``;
};

const isDetailsAvailable = (isDestinationTemplateAvailable, isOfferTemplateAvailable) => {

  return isDestinationTemplateAvailable || isOfferTemplateAvailable;
};

const createDestinationInfoTemplate = (destination, items) => {
  const currentDestination = items.find((it) => it.name === destination);

  const getPhotoTemplate = () => {
    return currentDestination.pictures.length
      ? (currentDestination.pictures)
        .map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`).join(`\n`) : ``;
  };

  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${currentDestination.description}</p>
  <div class="event__photos-container">
    <div class="event__photos-tape">
    ${getPhotoTemplate()}
    </div>
  </div>
</section>`;
};

const createEventEditTemplate = (options, destinations, event, isNewEvent) => {
  const {id, price, dateStart, dateEnd, isFavorite, type, destination, isDisabled, isSaving, isDeleting} = event;
  const transferListTemplate = createTypeListTemplate(EVENT_TYPES.transfers, type);
  const actionsListTemplate = createTypeListTemplate(EVENT_TYPES.actions, type);
  const eventTitleType = createEventTitleType(type);
  const destinationListTemplate = createDestinationListTemplate(destinations);
  const isDestinationTemplateAvailable = isDestinationsAvailable(destination, destinations);
  const lengthAddOptionsForType = options.find((offer) => offer.type === type).offers.length;
  const offersTemplate = createOffersTemplate(options, type, event, isDisabled);
  const startTime = getDateThroughSlahs(dateStart);
  const endTime = getDateThroughSlahs(dateEnd);
  const checkedisFavorite = (!isFavorite) ? `` : `checked`;

  return (
    `<form class="trip-events__item event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
          </label>
          <input
          class="event__type-toggle  visually-hidden"
          id="event-type-toggle-${id}"
          type="checkbox"
          ${isDisabled ? `disabled` : ``}
        >

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
          ${transformToFirstCapitalize(eventTitleType)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? destination.name : ``}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${destinationListTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input
          class="event__input  event__input--time"
          id="event-start-time-${id}"
          type="text" name="event-start-time"
          value="${startTime}"
          required
          ${isDisabled ? `disabled` : ``}
        >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input
          class="event__input  event__input--time"
          id="event-end-time-${id}"
          type="text"
          name="event-end-time"
          value="${endTime}"
          required
          ${isDisabled ? `disabled` : ``}
        >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
          class="event__input  event__input--price"
          id="event-price-${id}"
          type="text"
          name="event-price"
          value="${he.encode(price.toString())}"
          ${isDisabled ? `disabled` : ``}
        >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>
          ${isSaving ? `Saving` : `Save`}
        </button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>
          ${isNewEvent ? `Cancel` : `${isDeleting ? `Deleting` : `Delete`}`}
        </button>

      ${!isNewEvent ? `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${checkedisFavorite}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
      : ``}
      </header>

      ${isDetailsAvailable(isDestinationTemplateAvailable, lengthAddOptionsForType) ?
      `<section class="event__details">
        ${lengthAddOptionsForType ? offersTemplate : ``}
        ${isDestinationTemplateAvailable ? createDestinationInfoTemplate(destination.name, destinations) : ``}
     </section>`
      : ``}


    </form>`
  );
};

export default class EditEvent extends SmartView {
  constructor(offersModel, destinationsModel, isNewEvent, event = Object.assign({}, BLANK_EVENT)) {
    super();
    this._data = EditEvent.parseEventToData(event);
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._isNewEvent = isNewEvent;
    this._datepickers = null;
    this._submitForm = this._submitForm.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._dateChangeHandler = this._dateChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    this._setInnerHandlers();
    this._setDatePicker();
  }

  removeElement() {
    super.removeElement();
    if (this._datepickers) {
      this._datepickers.forEach((item) => item.destroy());
      this._datepickers = null;
    }
  }

  getTemplate() {
    const destinations = this._destinationsModel.getDestinations();
    const offers = this._offersModel.getOffers();
    return createEventEditTemplate(offers, destinations, this._data, this._isNewEvent);
  }

  _setDatePicker() {
    if (this._datepickers) {
      this._datepickers.forEach((item) => item.destroy());
      this._datepickers = null;
    }

    const eventStartTime = flatpickr(
        this.getElement().querySelector(`.event__input--time[name="event-start-time"]`),
        Object.assign(
            {
              defaultDate: this._data.dateStart,
              onChange: this._dateChangeHandler
            },
            FLATPICKR_PROPERTIES
        )
    );

    const eventEndTime = flatpickr(
        this.getElement().querySelector(`.event__input--time[name="event-end-time"]`),
        Object.assign(
            {
              defaultDate: this._data.dateEnd,
              minDate: this._data.dateStart,
              onChange: this._dateChangeHandler
            },
            FLATPICKR_PROPERTIES
        )
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

        this._datepickers[1].set(`minDate`, userDate);
        this._datepickers[1].setDate(userDate);

      } else {
        this.updateData({
          dateStart: userDate
        }, true);
        this._datepickers[1].set(`minDate`, userDate);
      }

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
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._typeChangeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._priceChangeHandler);
    this.getElement().querySelector(`.event__details`).addEventListener(`change`, this._offerChangeHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.dataset.type,
      offers: []
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();

    const availableDestination = new Set();
    const destinations = this._destinationsModel.getDestinations();
    for (const destination of destinations) {
      availableDestination.add(destination.name);
    }
    const update = destinations.filter((destination) => destination.name === evt.target.value)[0];

    this.updateData({
      destination: availableDestination.has(evt.target.value) ? update : null
    });
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _offerChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    evt.preventDefault();
    let update = this._data.offers.slice();
    if (evt.target.checked) {
      update.push({
        title: evt.target.dataset.title,
        price: +evt.target.dataset.price
      });

      this.updateData({
        offers: update
      });

    } else {

      update = update.filter((offer) => offer.title !== evt.target.dataset.title);
      this.updateData({
        offers: update
      });
    }
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;

    if (!this._isNewEvent) {
      this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favoriteClickHandler);
    }
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._callback._submitForm(EditEvent.parseDataToEvent(this._data));
  }

  setSubmitFormHandler(callback) {
    this._callback._submitForm = callback;
    this.getElement().addEventListener(`submit`, this._submitForm);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditEvent.parseDataToEvent(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    const update = isNaN(evt.target.value) || evt.target.value === `` ? 0 : +evt.target.value;

    this.updateData({
      price: update
    });
  }

  static parseEventToData(event) {
    return Object.assign({}, event, {
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    });
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
