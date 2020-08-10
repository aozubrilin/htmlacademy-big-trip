import {getRandomInteger, getRandomArrayItem} from "../utils.js";
import {CITIES, MOCK_DESCRIPTION, EVENT_TYPES} from '../const.js';

const MAX_PRICE = 200;
const RANDOM_TITLE = `Completely random text №`;

const {transfers, actions} = EVENT_TYPES;
const types = [...actions, ...transfers];

const generateRandomOffer = () => {
  const countOffers = getRandomInteger(1, 5);
  const randomPrice = getRandomInteger(0, MAX_PRICE);
  const randomOffers = new Array(countOffers).fill().map(() => ({title: RANDOM_TITLE + getRandomInteger(0, 100), price: randomPrice}));
  const isOffer = Boolean(getRandomInteger(0, 1));

  return (!isOffer) ? null : randomOffers;
};

const generateAdditionalOptions = () => {
  const additionalOptions = [];
  const offers = generateRandomOffer();
  for (let i = 0; i < types.length; i++) {
    additionalOptions.push({type: `${types[i]}`, offers});
  }

  return additionalOptions;
};

const generateOfferForType = (typeItem) => {
  const additionalOption = generateAdditionalOptions();
  let OffersForType = [];
  for (const key in additionalOption) {
    if (additionalOption[key].type === typeItem) {
      OffersForType = additionalOption[key];
    }
  }

  return OffersForType.offers;
};

const generateDescription = () => {
  const splitTexts = MOCK_DESCRIPTION.split(`. `);
  const counеSentence = getRandomInteger(1, 5);
  return new Array(counеSentence).fill().map(() => getRandomArrayItem(splitTexts)).join(`. `);
};

const generatePhoto = () => {
  const listPhotos = [];
  const countFoto = getRandomInteger(1, 5);
  for (let i = 0; i < countFoto; i++) {
    listPhotos.push(`<img class="event__photo" src=http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo"></img>`);
  }

  return listPhotos.join(`\n`);
};

const generateDataStart = () => {
  const maxDaysGap = 2;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysGap);
  currentDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));

  return new Date(currentDate);
};

const generateDataEnd = (date) => {
  const dataStart = new Date(date);
  const dataEnd = new Date(dataStart.setHours(getRandomInteger(dataStart.getHours() + 1, 23), getRandomInteger(0, 59)));

  return new Date(dataEnd);
};

export const generateEvents = () => {
  const type = getRandomArrayItem(types);
  const dataStart = generateDataStart();
  const dataEnd = generateDataEnd(dataStart);

  return {
    type,
    city: getRandomArrayItem(CITIES),
    offer: generateOfferForType(type),
    destinationInfo: {
      description: generateDescription(),
      photo: generatePhoto()
    },
    dataStart,
    dataEnd
  };
};
