import AbstractView from "./abstract.js";
import {getISODateTime, getShortDate} from "../utils/event.js";


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

export default class DayItem extends AbstractView {
  constructor(day, index, events) {
    super();
    this._day = day;
    this._index = index;
    this._events = events;
  }

  getTemplate() {
    return createDayItemTemplate(this._day, this._index, this._events);
  }
}
