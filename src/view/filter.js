import {createElement} from "../utils.js";

const createFiterItemsTemlate = (filters) => {

  return filters.map((it) =>`<div class="trip-filters__filter">
                          <input id="filter-${it.name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden"
                          type="radio" name="trip-filter" value="${it.name.toLowerCase()}" ${it.isChecked ? `checked` : ``}>
                          <label class="trip-filters__filter-label" for="filter-${it.name.toLowerCase()}">${it.name}</label>
                          </div>`).join(``);
};

const createFilterTemplate = () => {

  const filters = [
    {
      name: `Everything`,
      isChecked: true,
    },
    {
      name: `Future`,
      isChecked: false,
    },
    {
      name: `Past`,
      isChecked: false,
    },
  ];

  const filterItemsTemplate = createFiterItemsTemlate(filters);

  return (
    ` <form class="trip-filters" action="#" method="get">

    ${filterItemsTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
