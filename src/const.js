export const EVENT_TYPES = {
  transfers: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  actions: [`check-in`, `sightseeing`, `restaurant`]
};

export const SortType = {
  DEFAULT: `event`,
  DURATION: `time`,
  PRICE: `price`
};

export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`
};
