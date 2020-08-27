import {Destination} from '../const.js';
import {getRandomInteger, getRandomArrayItem} from "../utils/common.js";

const generateDescription = () => {
  const splitTexts = Destination.DESCRIPTION.split(`\n`);
  const countSentence = getRandomInteger(1, 5);
  return new Array(countSentence).fill().map(() => getRandomArrayItem(splitTexts)).join(``);
};

const generatePhoto = () => {
  return new Array(getRandomInteger(1, 5)).fill().map(() => `src="http://picsum.photos/248/152?r=${Math.random()}"`);
};

export const generateDestinations = () => {
  const destinations = [];
  for (const item of Destination.CITIES) {
    destinations.push({city: item, destinationInfo: {photos: generatePhoto(), description: generateDescription()}});
  }

  return destinations;
};
