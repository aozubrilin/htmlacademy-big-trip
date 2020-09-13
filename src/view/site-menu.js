import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

const ACTIVE_CLASS = `trip-tabs__btn--active`;

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active"  data-title=${MenuItem.TABLE} href="#">${MenuItem.TABLE}</a>
        <a class="trip-tabs__btn" data-title=${MenuItem.STATS}  href="#">${MenuItem.STATS}</a>
      </nav>`
    );
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const menuItems = this.getElement().querySelectorAll(`.trip-tabs__btn`);

    menuItems.forEach((item) => {
      if (item.classList.contains(ACTIVE_CLASS)) {
        item.classList.remove(ACTIVE_CLASS);
      }
    });

    const currentActiveMenuItem = this.getElement().querySelector(`[data-title=${menuItem}]`);
    if (currentActiveMenuItem) {
      currentActiveMenuItem.classList.add(ACTIVE_CLASS);
    }
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.title);
  }
}
