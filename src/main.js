import {createTripInfoTemplate} from "./view/trip-info.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createDaysTemplate} from "./view/days.js";
import {generateEvents} from "./mock/event.js";

const ROUTE_POINT_COUNT = 20;

const events = new Array(ROUTE_POINT_COUNT).fill().map(generateEvents);
const sortedEvents = events.slice(0).sort((current, next) => current.dateStart - next.dateStart);
const days = new Set(sortedEvents.map((it) => it.dateStart.toLocaleDateString()));

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`.page-body`);
const tripMainContainer = siteBodyElement.querySelector(`.trip-main`);

render(tripMainContainer, createTripInfoTemplate(sortedEvents), `afterBegin`);

const tripMenu = siteBodyElement.querySelector(`.trip-controls, h2`);

render(tripMenu, createSiteMenuTemplate(), `beforeend`);
render(tripMenu, createFilterTemplate(), `beforeend`);

const tripEventsContainer = siteBodyElement.querySelector(`.trip-events`);

render(tripEventsContainer, createSortTemplate(), `beforeend`);
render(tripEventsContainer, createDaysTemplate(days, sortedEvents), `beforeend`);


