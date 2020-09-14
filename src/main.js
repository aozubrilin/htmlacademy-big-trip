import SiteMenuView from "./view/site-menu.js";
import AddNewButtonView from "./view/add-new-button.js";
import StatisticsView from "./view/statistics.js";
import TripInfoPresenter from "./presenter/trip-info.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic ascfsaawqFqe`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const siteBodyElement = document.querySelector(`.page-body`);
const tripMainContainer = siteBodyElement.querySelector(`.trip-main`);
const tripMenu = tripMainContainer.querySelector(`.trip-controls`);
const tripEventsContainer = siteBodyElement.querySelector(`.trip-events`);

const newEventButtonClickHandler = () => {

  if (statisticsComponent !== null) {
    remove(statisticsComponent);
  }

  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();
  tripPresenter.createEvent();
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
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

const enableMenu = () => {
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  addNewButtonComponent.setClickHandler(newEventButtonClickHandler);
  addNewButtonComponent.disabledButton();
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView();
const addNewButtonComponent = new AddNewButtonView(true);

const tripInfoPresenter = new TripInfoPresenter(tripMainContainer, eventsModel);
const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel, offersModel, destinationsModel, filterModel, api, addNewButtonComponent);
const filterPresenter = new FilterPresenter(tripMenu, filterModel);

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

render(tripMainContainer.querySelector(`h2`), siteMenuComponent, RenderPosition.AFTEREND);
render(tripMainContainer, addNewButtonComponent, RenderPosition.BEFOREEND);

Promise.all([
  api.getOffers(),
  api.getDestinations(),
  api.getEvents(),
])
  .then(([offers, destinations, events]) => {
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    eventsModel.setEvents(UpdateType.INIT, events);
    enableMenu();
  })
  .catch(() => {
    tripPresenter.renderError();
    eventsModel.setEvents(UpdateType.INIT, []);
  });
