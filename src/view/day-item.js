import {getISODateTime, getShortDate, createElement} from "../utils.js";

const createDayItemTemplate = (day, index, events) => {

  const eventsByDay = events.filter((event) => event.dateStart.toLocaleDateString() === day);

  const date = eventsByDay[0].dateStart;
  const datetime = getISODateTime(date);
  const shortDate = getShortDate(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${datetime}">${shortDate}</time>
      </div>
      <ul class="trip-events__list"> </ul>
     </li>`
  );
};

export default class DayItem {
  constructor(day, index, events) {
    this._day = day;
    this._index = index;
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createDayItemTemplate(this._day, this._index, this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
