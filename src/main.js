import TripInfoView from "./view/trip-info.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import NoEventView from "./view/no-event.js";
import DaysView from "./view/days.js";
import DayItemView from "./view/day-item.js";
import EventView from "./view/event.js";
import EditEventView from "./view/edit-event.js";
import {generateEvents} from "./mock/event.js";
import {render, RenderPosition} from "./utils.js";

const ROUTE_POINT_COUNT = 20;
const ESC_KEY = `Escape` || `Esc`;

const events = new Array(ROUTE_POINT_COUNT).fill().map(generateEvents);
const sortedEvents = events.slice().sort((current, next) => current.dateStart - next.dateStart);

const siteBodyElement = document.querySelector(`.page-body`);
const tripMainContainer = siteBodyElement.querySelector(`.trip-main`);
const tripMenu = tripMainContainer.querySelector(`.trip-controls`);
const tripEventsContainer = siteBodyElement.querySelector(`.trip-events`);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EditEventView(event);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
    replaceFormToEvent();
  });

  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

render(tripMainContainer, new TripInfoView(sortedEvents).getElement(), RenderPosition.AFTERBEGIN);

render(tripMenu.querySelector(`h2`), new SiteMenuView().getElement(), RenderPosition.AFTEREND);
render(tripMenu, new FilterView().getElement(), RenderPosition.BEFOREEND);

if (!events.length) {
  render(tripEventsContainer, new NoEventView().getElement(), RenderPosition.AFTERBEGIN);
} else {
  const daysComponent = new DaysView();
  render(tripEventsContainer, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsContainer, daysComponent.getElement(), RenderPosition.BEFOREEND);

  const groupsEventsByDate = sortedEvents.reduce((group, event) => {
    const date = event.dateStart.toLocaleDateString();

    if (!group[date]) {
      group[date] = [];
    }
    group[date].push(event);
    return group;
  }, {});

  Object.keys(groupsEventsByDate).map((date, index) => {
    const dayComponent = new DayItemView(date, index, events);
    render(daysComponent.getElement(), dayComponent.getElement(), RenderPosition.BEFOREEND);
    for (const event of groupsEventsByDate[date]) {
      renderEvent(dayComponent.getElement().querySelector(`.trip-events__list`), event);
    }
  });
}
