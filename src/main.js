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
import {getRandomString} from "./utils/common.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";
import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION_KEY_LENGTH = 12;
const END_POINT = `https://15.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const OFFLINE_TITLE = ` [offline]`;

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

const autorization = `Basic ` + getRandomString(AUTHORIZATION_KEY_LENGTH);

const api = new Api(END_POINT, autorization);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView();
const addNewButtonComponent = new AddNewButtonView(true);

const tripInfoPresenter = new TripInfoPresenter(tripMainContainer, eventsModel);
const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel, offersModel, destinationsModel, filterModel, apiWithProvider, addNewButtonComponent);
const filterPresenter = new FilterPresenter(tripMenu, filterModel, eventsModel);

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

render(tripMainContainer.querySelector(`h2`), siteMenuComponent, RenderPosition.AFTEREND);
render(tripMainContainer, addNewButtonComponent, RenderPosition.BEFOREEND);

Promise.all([
  apiWithProvider.getOffers(),
  apiWithProvider.getDestinations(),
  apiWithProvider.getEvents(),
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

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(OFFLINE_TITLE, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += OFFLINE_TITLE;
});
