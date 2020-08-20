const ICON = `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
              </svg>`;

const createSortItemsTemplate = (sortItems) => {
  return sortItems.map((it) =>
    !it.isInput ? `<span class="trip-sort__item  trip-sort__item--${it.name.toLowerCase()}">${it.name}</span>` : `<div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${it.name.toLowerCase()}" ${it.isChecked ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${it.name.toLowerCase()}">
        ${it.name}
        ${!it.hasIcon ? ICON : ``}
        </label >
        </div>`).join(``);
};

export const createSortTemplate = () => {

  const sortItems = [
    {
      name: `Day`,
      hasIcon: false,
      isChecked: false,
      isInput: false,
    },
    {
      name: `Event`,
      hasIcon: false,
      isChecked: true,
      isInput: true,
    },
    {
      name: `Time`,
      hasIcon: true,
      isChecked: false,
      isInput: true,
    },
    {
      name: `Price`,
      hasIcon: true,
      isChecked: false,
      isInput: true,
    },
    {
      name: `Offers`,
      hasIcon: false,
      isChecked: false,
      isInput: false,
    }
  ];

  const sortItemsTemplate = createSortItemsTemplate(sortItems);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
    </form>`
  );
};
