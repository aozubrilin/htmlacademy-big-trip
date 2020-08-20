import {getRandomInteger, getRandomArrayItem, getRandomBoolean} from "../utils.js";
import {Destination, EVENT_TYPES, Price} from '../const.js';
import {addOptions} from './offers.js';
import {generateDestinations} from './destination.js';

const MAX_DAYS_GAP = 2;

const {transfers, actions} = EVENT_TYPES;
const types = [...actions, ...transfers];

const getDestinationInfo = (destination) => {
  const destinations = generateDestinations();

  return destinations.find((it) => it.city === destination).destinationInfo;
};

const getOffers = (type) => {
  const offers = [];
  addOptions.find((it) => it.type === type).offers.forEach((it) => getRandomBoolean() > 0.5 ? offers.push(it) : ``);
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
    type,
    destination,
    price: getRandomInteger(Price.MIN, Price.MAX),
    offers: getOffers(type),
    destinationInfo: getDestinationInfo(destination),
    dateStart,
    dateEnd,
    favorit: getRandomBoolean()
  };
};
