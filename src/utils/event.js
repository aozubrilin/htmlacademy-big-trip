import {EVENT_TYPES} from '../const.js';
import moment from "moment";

export const getISODateTime = (date) => {
  return moment(date).format(`YYYY-MM-DD[T]HH:mm`);
};

export const getDuration = (dateStart, dateEnd) => {
  const diff = moment(dateEnd).diff(dateStart);
  const duration = moment.duration(diff);
  const days = duration.days() ? (duration.days() + `D`).padStart(3, `0`) : ``;
  const hours = duration.hours() ? (duration.hours() + `H`).padStart(3, `0`) : ``;
  const minutes = duration.minutes() ? (duration.minutes() + `M`).padStart(3, `0`) : ``;

  return `${days} ${hours} ${minutes}`.trim();
};

export const getShortDate = (date) => {
  return moment(date).format(`MMM D`);
};

export const getDateThroughSlahs = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`DD/MM/YYYY HH:mm`);
};

export const createEventTitleType = (type) => {
  return EVENT_TYPES.actions.includes(type) ? `${type} in` : `${type} to`;
};
