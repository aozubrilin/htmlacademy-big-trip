import {TimeUnits, EVENT_TYPES} from '../const.js';

const DateSettings = {
  DATE: {day: `numeric`, month: `2-digit`, year: `2-digit`},
  TIME: {hour12: false, hour: `2-digit`, minute: `numeric`}
};

export const getISODateTime = (date) => {
  return date.toLocaleDateString(`lt-LT`, DateSettings.DATE).replace(/[/]/g, `-`) + `T` + date.toLocaleString(`ru-GB`, DateSettings.TIME);
};

export const getDuration = (dateStart, dateEnd) => {
  const durationInMs = (dateEnd - dateStart);
  const durationDays = Math.floor(durationInMs / TimeUnits.SECONDS_IN_DAY);
  const durationHours = Math.floor(((durationInMs / TimeUnits.SECONDS_IN_DAY) - durationDays) * TimeUnits.HOURS_IN_DAY);
  const durationMinutes = Math.round(((durationInMs / TimeUnits.SECONDS_IN_DAY * TimeUnits.HOURS_IN_DAY) - durationHours) * TimeUnits.MINUTES_IN_HOUR);
  const stringDurationDays = durationDays !== 0 ? (durationDays + `D `).padStart(4, `0`) : ``;
  const stringDurationHours = durationHours !== 0 ? (durationHours + `H `).padStart(4, `0`) : ``;
  const stringDurationMinutes = durationMinutes !== 0 ? (durationMinutes + `M`).padStart(3, `0`) : ``;
  return stringDurationDays + stringDurationHours + stringDurationMinutes;
};

export const getShortDate = (date) => {
  return date.toLocaleDateString(`en-US`, {month: `short`, day: `2-digit`});
};

export const getDateThroughSlahs = (date) => {
  return date.toLocaleString(`en-GB`, DateSettings.DATE) + ` ` + date.toLocaleString(`ru-GB`, DateSettings.TIME);
};

export const createEventTitleType = (type) => {
  return EVENT_TYPES.actions.includes(type) ? `${type} in` : `${type} to`;
};
