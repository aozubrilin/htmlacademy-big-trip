import {EVENT_TYPES, Price} from '../const.js';
import {getRandomInteger} from '../utils.js';

const MOK_OFFERS = [
  {lable: `order`, title: `Order Uber`},
  {lable: `comfort`, title: `Switch to comfort`},
  {lable: `luggage`, title: `Add luggage`},
  {lable: `radio`, title: `Choose radio`},
  {lable: `luggage`, title: `Add luggage`},
  {label: `seats`, title: `Choose seats`},
  {label: `meal`, title: `Add meal`},
  {lable: `tickets`, title: `Book tickets`},
  {lable: `lunch`, title: `Lunch in city`},
  {lable: `rent`, title: `Rent a car`},
  {label: `train`, title: `Travel by train`}
];

const MAX_QUANTITY_OFFERS = 5;

const generateOffersItems = () => {
  const countOffersItem = getRandomInteger(0, MAX_QUANTITY_OFFERS);
  return new Array(countOffersItem).fill()
   .map(() => Object.assign({}, MOK_OFFERS[getRandomInteger(0, MOK_OFFERS.length - 1)], {price: getRandomInteger(Price.MIN, Price.MAX)}));
};

const generateAddOptions = () => {
  const types = [...EVENT_TYPES.transfers, ...EVENT_TYPES.actions];

  return types.map((it) => {
    return {type: it, offers: (generateOffersItems())};
  });
};

export const addOptions = generateAddOptions();

