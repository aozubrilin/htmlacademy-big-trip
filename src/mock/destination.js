import {Destination} from '../const.js';
import {getRandomInteger, getRandomArrayItem} from "../utils.js";

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
  for (const city1 of Destination.CITIES) {
    destinations.push({city: city1, destinationInfo: {photo: generatePhoto(), description: generateDescription()}});
  }

  return destinations;
};
