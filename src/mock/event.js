import {getRandomInteger, getRandomArrayItem, getRandomBoolean} from "../utils/common.js";
import {Destination, EVENT_TYPES, Price} from "../const.js";
import {mockOptions} from "../main.js";

const MAX_DAYS_GAP = 2;

const {transfers, actions} = EVENT_TYPES;
const types = [...actions, ...transfers];

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getOffers = (type) => {
  const offers = [];
  mockOptions.find((it) => it.type === type).offers.forEach((it) => getRandomBoolean() && offers.push(it));
  return offers;
};

const generateDateStart = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysGap);
  currentDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));

  return currentDate;
};

const generateDateEnd = (date) => {
  const dateStart = new Date(date);
  const dateEnd = new Date(dateStart.setHours(getRandomInteger(dateStart.getHours() + 1, 24), getRandomInteger(0, 59)));

  return dateEnd;
};

export const generateEvents = () => {
  const type = getRandomArrayItem(types);
  const dateStart = generateDateStart();
  const dateEnd = generateDateEnd(dateStart);
  const destination = getRandomArrayItem(Destination.CITIES);

  return {
    id: generateId(),
    type,
    destination,
    price: getRandomInteger(Price.MIN, Price.MAX),
    offers: getOffers(type),
    dateStart,
    dateEnd,
    isFavorite: getRandomBoolean()
  };
};
