import {createEventTemplate} from "../view/event.js";
import {createEventEditTemplate} from "../view/edit-event.js";
import {getISODateTime, getShortDate} from "../utils.js";

export const createDayItemTemplate = (day, index, events) => {

  const eventsByDay = events.filter((event) => event.dateStart.toLocaleDateString() === day);
  const eventsTemplate = eventsByDay
    .map((event) => {
      if (index === 0 && event === eventsByDay[0]) {
        return createEventEditTemplate(event);
      }
      return createEventTemplate(event);
    })
    .join(`\n`);

  const date = eventsByDay[0].dateStart;
  const datetime = getISODateTime(date);
  const shortDate = getShortDate(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${datetime}">${shortDate}</time>
      </div>
      <ul class="trip-events__list">
      ${eventsTemplate}
      </ul>
     </li>`
  );
};
