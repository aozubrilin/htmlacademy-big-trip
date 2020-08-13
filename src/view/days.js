import {createDayItemTemplate} from './day-item.js';

export const createDaysTemplate = (days, events) => {
  const daysTemplate = [...days]
      .map((day, index) => createDayItemTemplate(day, index, events))
      .join(``);

  return (
    `<ul class="trip-days">
    ${daysTemplate}
     </ul>`
  );
};
