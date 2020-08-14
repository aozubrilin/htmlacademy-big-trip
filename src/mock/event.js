import {getRandomInteger, getRandomArrayItem} from "../utils.js";
import {DESTINATIONS, MOCK_DESCRIPTION, EVENT_TYPES} from '../const.js';

const MAX_PRICE = 200;
const MIN_PRICE = 10;
const OFFERS = [
  {
    type: `order`,
    title: `Order Uber`,
    price: 20
  },
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 50
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 15
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 5
  },
  {
    type: `train`,
    title: `Travel by train`,
    price: 40
  }
];

const {transfers, actions} = EVENT_TYPES;
const types = [...actions, ...transfers];

const generateOffers = () => {
  const countOffers = getRandomInteger(0, 5);
  return new Array(countOffers).fill().map(() => OFFERS[getRandomInteger(0, OFFERS.length - 1)]);
};

const generateDescription = () => {
  const splitTexts = MOCK_DESCRIPTION.split(`\n`);
  const countSentence = getRandomInteger(1, 5);
  return new Array(countSentence).fill().map(() => getRandomArrayItem(splitTexts)).join(``);
};

const generatePhoto = () => {
  const countFoto = getRandomInteger(1, 5);

  return new Array(countFoto).fill().map(() =>`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo"></img>`).join(`\n`);
};

const generateDateStart = () => {
  const maxDaysGap = 2;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysGap);
  currentDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));

  return new Date(currentDate);
};

const generateDateEnd = (date) => {
  const dateStart = new Date(date);
  const dateEnd = new Date(dateStart.setHours(getRandomInteger(dateStart.getHours() + 1, 24), getRandomInteger(0, 59)));

  return new Date(dateEnd);
};

export const generateEvents = () => {
  const type = getRandomArrayItem(types);
  const dateStart = generateDateStart();
  const dateEnd = generateDateEnd(dateStart);

  return {
    type,
    destination: getRandomArrayItem(DESTINATIONS),
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    offers: generateOffers(),
    destinationInfo: {
      description: generateDescription(),
      photo: generatePhoto()
    },
    dateStart,
    dateEnd,
    favorit: Boolean(getRandomInteger(0, 1))
  };
};
