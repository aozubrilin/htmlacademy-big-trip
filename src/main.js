import TripInfoView from "./view/trip-info.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import TripPresenter from "./presenter/trip.js";
import {generateEvents} from "./mock/event.js";
import {generateAddOptions} from "./mock/offers.js";
import {generateDestinations} from "./mock/destination.js";
import {render, RenderPosition} from "./utils/render.js";


export const mockOptions = generateAddOptions();
const mockDestinations = generateDestinations();

const ROUTE_POINT_COUNT = 20;

const events = new Array(ROUTE_POINT_COUNT).fill().map(generateEvents);
const sortedEvents = events.slice().sort((current, next) => current.dateStart - next.dateStart);

const siteBodyElement = document.querySelector(`.page-body`);
const tripMainContainer = siteBodyElement.querySelector(`.trip-main`);
const tripMenu = tripMainContainer.querySelector(`.trip-controls`);
const tripEventsContainer = siteBodyElement.querySelector(`.trip-events`);

render(tripMainContainer, new TripInfoView(sortedEvents), RenderPosition.AFTERBEGIN);
render(tripMenu.querySelector(`h2`), new SiteMenuView(), RenderPosition.AFTEREND);
render(tripMenu, new FilterView(), RenderPosition.BEFOREEND);


const tripPresenter = new TripPresenter(tripEventsContainer);
tripPresenter.init(events, mockOptions, mockDestinations);
