import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
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
import {render, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";

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

const siteMenuComponent = new SiteMenuView();
render(tripMainContainer.querySelector(`h2`), siteMenuComponent, RenderPosition.AFTEREND);

const tripInfoPresenter = new TripInfoPresenter(tripMainContainer, eventsModel);
const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel, offersModel, destinationsModel, filterModel);
const filterPresenter = new FilterPresenter(tripMenu, filterModel);

const handleNewEventFormClose = () => {
  tripMainContainer.querySelector(`.trip-main__event-add-btn`).disabled = false;
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.destroy();
      remove(statisticsComponent);
      tripPresenter.init();
      break;
    case MenuItem.STATS:
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(tripEventsContainer, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }

  siteMenuComponent.setMenuItem(menuItem);
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

tripMainContainer
  .querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, (evt) => {
    evt.preventDefault();
    evt.target.disabled = true;

    if (statisticsComponent !== null) {
      remove(statisticsComponent);
    }

    tripPresenter.destroy();
    filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    tripPresenter.init();
    tripPresenter.createEvent(handleNewEventFormClose);

    siteMenuComponent.setMenuItem(MenuItem.TABLE);
  });

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();
