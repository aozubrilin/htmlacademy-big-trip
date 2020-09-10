import SiteMenuView from "./view/site-menu.js";
import TripInfoPresenter from "./presenter/trip-info.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import OffersModel from './model/offers.js';
import DestinationsModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";
import {generateEvents} from "./mock/event.js";
import {generateAddOptions} from "./mock/offers.js";
import {generateDestinations} from "./mock/destination.js";
import {render, RenderPosition} from "./utils/render.js";

export const mockOptions = generateAddOptions();

const ROUTE_POINT_COUNT = 20;

const events = new Array(ROUTE_POINT_COUNT).fill().map(generateEvents);
const mockDestinations = generateDestinations();

const siteBodyElement = document.querySelector(`.page-body`);
const tripMainContainer = siteBodyElement.querySelector(`.trip-main`);
const tripMenu = tripMainContainer.querySelector(`.trip-controls`);
const tripEventsContainer = siteBodyElement.querySelector(`.trip-events`);

const filterModel = new FilterModel();

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const offersModel = new OffersModel();
offersModel.setOffers(mockOptions);

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(mockDestinations);


render(tripMenu.querySelector(`h2`), new SiteMenuView(), RenderPosition.AFTEREND);

const tripInfoPresenter = new TripInfoPresenter(tripMainContainer, eventsModel);
const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel, offersModel, destinationsModel, filterModel);
const filterPresenter = new FilterPresenter(tripMenu, filterModel);

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

siteBodyElement
  .querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tripPresenter.createEvent();
  });


