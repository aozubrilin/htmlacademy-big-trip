import SortView from "../view/sort.js";
import NoEventView from "../view/no-event.js";
import DaysView from "../view/days.js";
import DayItemView from "../view/day-item.js";
import EventView from "../view/event.js";
import EditEventView from "../view/edit-event.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {SortType} from "../const.js";

const calculateDuration = (event) => {
  return event.dateEnd - event.dateStart;
};

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = new SortView();
    this._daysComponent = new DaysView();
    this._noEventComponent = new NoEventView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._sourcedEvents = events.slice();


    if (!this._events.length) {
      this._renderNoEvent();
    } else {
      this._renderSort();
      this._sortEvents(SortType.DEFAULT);
      this._renderDays();
      this._renderTrip();
    }
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.DEFAULT:
        this._events.sort((a, b) => a.dateStart - b.dateStart);
        break;
      case SortType.DURATION:
        this._events.sort((a, b) => calculateDuration(b) - calculateDuration(a));
        break;
      case SortType.PRICE:
        this._events.sort((a, b) => b.price - a.price);
        break;
      default:
        this._events = this._sourcedEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearDayList();
    this._renderTrip();
  }

  _renderDays() {
    render(this._tripContainer, this._daysComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {

    if (this._currentSortType !== SortType.DEFAULT) {
      const dayComponent = new DayItemView(null, null);
      render(this._daysComponent, dayComponent, RenderPosition.BEFOREEND);
      this._events.forEach((event) => {
        this._renderEvent(dayComponent.getElement().querySelector(`.trip-events__list`), event);
      });
    } else {
      const groupsEventsByDate = this._events.reduce((group, event) => {
        const date = event.dateStart.toLocaleDateString();

        if (!group[date]) {
          group[date] = [];
        }
        group[date].push(event);
        return group;
      }, {});

      Object.keys(groupsEventsByDate).forEach((date, index) => {
        const dayComponent = new DayItemView(date, index);
        render(this._daysComponent, dayComponent, RenderPosition.BEFOREEND);
        for (const event of groupsEventsByDate[date]) {
          this._renderEvent(dayComponent.getElement().querySelector(`.trip-events__list`), event);
        }
      });
    }
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

  _clearDayList() {
    this._daysComponent.getElement().innerHTML = ``;
  }
}
