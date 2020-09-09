import {FilterType} from "../const.js";

const currentDate = new Date();

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.PAST]: (events) => events.filter((event) => event.dateStart < currentDate),
  [FilterType.FUTURE]: (events) => events.filter((event) => event.dateEnd > currentDate)
};
