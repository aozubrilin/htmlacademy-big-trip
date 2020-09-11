import {EVENT_TYPES} from "../const.js";
import moment from 'moment';

const TripPointType = {
  TAXI: `Taxi`,
  BUS: `Bus`,
  TRAIN: `Train`,
  SHIP: `Ship`,
  TRANSPORT: `Transport`,
  DRIVE: `Drive`,
  FLIGHT: `Flight`,
  CHECK: `Check-in`,
  SIGHTSEEING: `Sightseeing`,
  RESTAURANT: `Restaurant`
};

const getDuration = (events) => {
  const dateStart = events.dateStart;
  const dateEnd = events.dateEnd;
  const duration = moment.duration(moment(dateEnd).diff(dateStart)).asHours();

  return Math.round(duration);
};

const sortResultMap = (resultMap) => {

  return new Map([...resultMap].sort((e1, e2) => e2[1] - e1[1]));
};

export const LabelStat = {
  [TripPointType.TAXI]: `🚕 TAXI`,
  [TripPointType.BUS]: `🚌 BUS`,
  [TripPointType.TRAIN]: `🚂 TRAIN`,
  [TripPointType.SHIP]: `🚢 SHIP`,
  [TripPointType.TRANSPORT]: `🚊 TRANSPORT`,
  [TripPointType.DRIVE]: `🚗 DRIVE`,
  [TripPointType.FLIGHT]: `✈️ FLY`,
  [TripPointType.CHECK]: `🏨 CHECK`,
  [TripPointType.SIGHTSEEING]: `🏛️ SIGHTSEEING`,
  [TripPointType.RESTAURANT]: `🍴 RESTAURANT`
};

export const getEventTypeMoneyStat = (events) => {
  const resultMap = new Map();

  for (const event of events) {
    if (!resultMap.has(event.type)) {
      resultMap.set(event.type, 0);
    }

    const price = resultMap.get(event.type) + event.price;
    resultMap.set(event.type, price);
  }

  return sortResultMap(resultMap);
};

export const getTransportStat = (events) => {
  const resultMap = new Map();

  for (const event of events) {
    if ((EVENT_TYPES.actions).includes(event.type)) {
      continue;
    }

    if (!resultMap.has(event.type)) {
      resultMap.set(event.type, 0);
    }

    const count = resultMap.get(event.type) + 1;
    resultMap.set(event.type, count);
  }

  return sortResultMap(resultMap);
};

export const getTimeStat = (events) => {
  const resultMap = new Map();
  for (const event of events) {
    if (!resultMap.has(event.type)) {
      resultMap.set(event.type, 0);
    }

    const value = resultMap.get(event.type);

    const difValue = getDuration(event);
    resultMap.set(event.type, value + difValue);
  }

  return sortResultMap(resultMap);
};

