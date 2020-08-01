import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripMainInfoTemplate} from "./view/main-trip-info.js";
import {createTripCostInfoTemplate} from "./view/trip-cost-info.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createDaysTemplate} from "./view/days.js";
import {createDayItemTemplate} from "./view/day-item.js";
import {createEventTemplate} from "./view/event.js";
import {createEventEditTemplate} from "./view/edit-event.js";

const ROUTE_POINT_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`.page-body`);
const tripMainContainer = siteBodyElement.querySelector(`.trip-main`);

render(tripMainContainer, createTripInfoTemplate(), `afterBegin`);

const tripInfo = siteBodyElement.querySelector(`.trip-info`);
const tripMenu = siteBodyElement.querySelector(`.trip-controls, h2`);

render(tripInfo, createTripMainInfoTemplate(), `beforeend`);
render(tripInfo, createTripCostInfoTemplate(), `beforeend`);
render(tripMenu, createSiteMenuTemplate(), `beforeend`);
render(tripMenu, createFilterTemplate(), `beforeend`);

const tripEventsContainer = siteBodyElement.querySelector(`.trip-events`);

render(tripEventsContainer, createSortTemplate(), `beforeend`);
render(tripEventsContainer, createDaysTemplate(), `beforeend`);

const tripDaysContainer = siteBodyElement.querySelector(`.trip-days`);

render(tripDaysContainer, createDayItemTemplate(), `beforeend`);

const eventsContainer = siteBodyElement.querySelector(`.trip-events__list`);

render(eventsContainer, createEventEditTemplate(), `beforeend`);

for (let i = 0; i < ROUTE_POINT_COUNT; i++) {
  render(eventsContainer, createEventTemplate(), `beforeend`);
}
