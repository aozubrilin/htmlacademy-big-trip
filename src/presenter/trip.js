import SortView from "../view/sort.js";
import NoEventView from "../view/no-event.js";
import DaysView from "../view/days.js";
import DayItemView from "../view/day-item.js";
import EventView from "../view/event.js";
import EditEventView from "../view/edit-event.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._sortComponent = new SortView();
    this._daysComponent = new DaysView();
    this._noEventComponent = new NoEventView();
  }

  init(events) {
    this._events = events.slice();

    if (!this._events.length) {
      this._renderNoEvent();
    } else {
      this._renderSort();
      this._renderDays();
      this._renderTrip(this._events);
    }
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderDays() {
    render(this._tripContainer, this._daysComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip(events) {
    const sortedEventsByDate = events.slice().sort((current, next) => current.dateStart - next.dateStart);
    const groupsEventsByDate = sortedEventsByDate.reduce((group, event) => {
      const date = event.dateStart.toLocaleDateString();

      if (!group[date]) {
        group[date] = [];
      }
      group[date].push(event);
      return group;
    }, {});

    Object.keys(groupsEventsByDate).forEach((date, index) => {
      const dayComponent = new DayItemView(date, index, groupsEventsByDate[date]);
      render(this._daysComponent, dayComponent, RenderPosition.BEFOREEND);
      for (const event of groupsEventsByDate[date]) {
        this._renderEvent(dayComponent.getElement().querySelector(`.trip-events__list`), event);
      }
    });
  }

  _renderEvent(eventListElement, event) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EditEventView(event);

    const replaceEventToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToEvent = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.setRollupClickHandler(() => {
      replaceEventToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setdeletelickHandler(() => {
      replaceFormToEvent();
    });

    eventEditComponent.setSubmitFormHandler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvent() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }
}
