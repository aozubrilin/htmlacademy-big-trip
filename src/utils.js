import {SECONDS_IN_DAY, HOURS_IN_DAY, MINUTES_IN_HOUR, EVENT_TYPES} from './const.js';

const addZero = (numb) => {
  return numb < 10 ? `0` + numb : numb;
};

export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayItem = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

export const createEventTitleType = (type) => {
  return EVENT_TYPES.actions.includes(type) ? `${type} in` : `${type} to`;
};

export const getISODateTime = (date) => {
  return date.toISOString().slice(0, 16);
};

export const getDuration = (dateStart, dateEnd) => {
  const durationInMs = (dateEnd - dateStart);
  const durationDays = Math.floor(durationInMs / SECONDS_IN_DAY);
  const durationHours = Math.floor(((durationInMs / SECONDS_IN_DAY) - durationDays) * HOURS_IN_DAY);
  const durationMinutes = Math.round(((durationInMs / SECONDS_IN_DAY * HOURS_IN_DAY) - durationHours) * MINUTES_IN_HOUR);
  const stringDurationDays = durationDays !== 0 ? addZero(durationDays) + `D ` : ``;
  const stringDurationHours = durationHours !== 0 ? addZero(durationHours) + `H ` : ``;
  const stringDurationMinutes = durationMinutes !== 0 ? addZero(durationMinutes) + `M` : ``;

  return stringDurationDays + stringDurationHours + stringDurationMinutes;
};


export const getShortDate = (date) => {
  return date.toLocaleDateString(`en-US`, {month: `short`, day: `2-digit`});
};

export const getDateThroughSlahs = (date) => {
  const optionsDate = {day: `numeric`, month: `2-digit`, year: `2-digit`};
  const optionsTime = {hour12: false, hour: `2-digit`, minute: `numeric`};
  return date.toLocaleString(`en-GB`, optionsDate) + ` ` + date.toLocaleString(`ru-GB`, optionsTime);
};


