const createSortItemsTemplate = (sort) => {

  const icon = `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                </svg>`;

  let sortItems = ``;
  for (let item of sort) {
    if (!item.isInput) {
      sortItems += `<span class="trip-sort__item  trip-sort__item--${item.name.toLowerCase()}">${item.name}</span>`;
    } else {
      sortItems += `<div class="trip-sort__item  trip-sort__item--time">
          <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.name.toLowerCase()}" ${item.isChecked ? `checked` : ``}>
          <label class="trip-sort__btn" for="sort-${item.name.toLowerCase()}">
            ${item.name}
            ${!item.hasIcon ? icon : ``}
          </label >
        </div > `;
    }
  }
  return sortItems;
};

export const createSortTemplate = () => {

  const sort = [
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

  const sortItemsTemplate = createSortItemsTemplate(sort);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemsTemplate}
    </form>`
  );
};
