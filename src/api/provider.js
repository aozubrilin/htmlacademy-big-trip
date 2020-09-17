import {nanoid} from "nanoid";
import EventsModel from "../model/events.js";

const StoreTitle = {
  OFFERS: `Offers`,
  DESTINATIONS: `Destinations`,
};

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.events);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    if (Provider.isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = createStoreStructure(events.map(EventsModel.adaptToServer));
          this._store.setItems(items);
          return events;
        });
    }

    const storeEvents = Object.values(this._store.getItems());

    return Promise.resolve(storeEvents.map(EventsModel.adaptToClient));
  }

  updateEvent(event) {
    if (Provider.isOnline()) {
      return this._api.updateEvent(event)
        .then((updatedEvent) => {
          this._store.setItem(updatedEvent.id, EventsModel.adaptToServer(updatedEvent));
          return updatedEvent;
        });
    }

    this._store.setItem(event.id, EventsModel.adaptToServer(Object.assign({}, event)));

    return Promise.resolve(event);
  }

  addEvent(event) {
    if (Provider.isOnline()) {
      return this._api.addEvent(event)
        .then((newEvent) => {
          this._store.setItem(newEvent.id, EventsModel.adaptToServer(newEvent));
          return newEvent;
        });
    }

    const localNewTaskId = nanoid();
    const localNewTask = Object.assign({}, event, {id: localNewTaskId});

    this._store.setItem(localNewTask.id, EventsModel.adaptToServer(localNewTask));

    return Promise.resolve(localNewTask);
  }

  deleteEvent(event) {
    if (Provider.isOnline()) {
      return this._api.deleteEvent(event)
        .then(() => this._store.removeItem(event.id));
    }

    this._store.removeItem(event.id);

    return Promise.resolve();
  }

  getDestinations() {
    if (Provider.isOnline) {
      return this._api.getDestinations()
      .then((destinations) => {
        this._store.setDataByKey(StoreTitle.DESTINATIONS, destinations);
        return destinations;
      });
    }

    return Promise.resolve(
        this._store.getDataByKey(StoreTitle.DESTINATIONS)
    );
  }


  getOffers() {
    if (Provider.isOnline) {
      return this._api.getOffers().then((offers) => {

        this._store.setDataByKey(StoreTitle.OFFERS, offers);

        return offers;
      });
    }

    return Promise.resolve(
        this._store.getDataByKey(StoreTitle.OFFERS)
    );
  }

  sync() {
    if (Provider.isOnline()) {
      const storeEvents = Object.values(this._store.getItems());

      return this._api.sync(storeEvents)
        .then((response) => {
          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);

          const items = createStoreStructure([...createdEvents, ...updatedEvents]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
