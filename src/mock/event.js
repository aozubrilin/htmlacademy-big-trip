import {getRandomInteger, getRandomArrayItem} from "../utils.js";
import {Destination, EVENT_TYPES} from '../const.js';
import {OFFERS} from './offers.js';
import {generateDestinations} from './destination.js';

const Price = {
  MAX: 200,
  MIN: 10
};

const {transfers, actions} = EVENT_TYPES;
const types = [...actions, ...transfers];

const destinations = generateDestinations();


const getDescription = (destination) => {
  return destinations.filter((it) => it.city === destination)[0].destinationInfo.description;
};

const getPhoto = (destination) => {
  let photos = [];
  destinations.forEach((it) => {
    if (it.city === destination) {
      it.destinationInfo.photos.map((photo) => photos.push(photo));
    }
  });

  return photos;
};

const generateOffers = (type) => {
  let result = [];
  OFFERS.map((it) => {
    if (it.type === type) {
      it.offers.forEach((offer) => {
        if (getRandomInteger(0, 1) > 0.5) {
          result.push(offer);
        }
      });
    }
  });

  return result.length ? result : null;
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
  const destination = getRandomArrayItem(Destination.CITIES);

  return {
    type,
    destination,
    price: getRandomInteger(Price.MIN, Price.MAX),
    offers: generateOffers(type),
    destinationInfo: {
      description: getDescription(destination),
      photo: getPhoto(destination)
    },
    dateStart,
    dateEnd,
    favorit: Boolean(getRandomInteger(0, 1))
  };
};
