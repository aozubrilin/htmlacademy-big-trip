const createFiterItemsTemlate = (filter) => {
  let filterItems = ``;
  for (const item of filter) {
    filterItems += `<div class="trip-filters__filter">
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden"
                  type="radio" name="trip-filter" value="${item.name.toLowerCase()}" ${item.isChecked ? `checked` : ``}>
                  <label class="trip-filters__filter-label" for="filter-${item.name.toLowerCase()}">${item.name}</label>
                  </div>`;
  }

  return filterItems;
};

export const createFilterTemplate = () => {

  const filter = [
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

  const filterItemsTemplate = createFiterItemsTemlate(filter);

  return (
    `<h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">

    ${filterItemsTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
