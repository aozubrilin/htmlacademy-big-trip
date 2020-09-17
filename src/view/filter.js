import AbstractView from "./abstract.js";

const createFiterItemsTemlate = (filters, currentFilterType) => {
  return filters
    .map((filter) => `<div class="trip-filters__filter">
                      <input id="filter-${filter.name}"
                        class="trip-filters__filter-input visually-hidden"
                        type="radio"
                        name="trip-filter"
                        value="${filter.name}"
                        ${filter.name === currentFilterType ? `checked` : ``}
                        ${filter.isDisabled ? `disabled` : ``}
                      >
                      <label class="trip-filters__filter-label" for="filter-${filter.name}">
                        ${filter.name}
                      </label>
                    </div>`
    )
    .join(`\n`);
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return (
      `<form class="trip-filters" action="#" method="get">
        ${createFiterItemsTemlate(this._filters, this._currentFilterType)}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
    );
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
