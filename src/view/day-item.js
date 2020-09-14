import AbstractView from "./abstract.js";
import {getISODateTime, getShortDate} from "../utils/event.js";

const createDayInfoTemplate = (day, index) => {
  const date = new Date(day.replace(/(\d{2})\.(\d{2})\.(\d{4})/, `$3-$2-$1`));

  return `<span class="day__counter">${index + 1}</span>
            <time class="day__date" datetime="${getISODateTime(date).slice(0, -6)}">${getShortDate(date)}</time>`;
};

const createDayItemTemplate = (day, index) => {
  const dayInfo = day !== null ? createDayInfoTemplate(day, index) : ``;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
      ${dayInfo}
      </div>
      <ul class="trip-events__list"> </ul>
     </li>`
  );
};

export default class DayItem extends AbstractView {
  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createDayItemTemplate(this._day, this._index);
  }
}
