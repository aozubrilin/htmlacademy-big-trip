const createFiterItemsTemlate = (filter) => {

  return filter.map((it) =>`<div class="trip-filters__filter">
                          <input id="filter-${it.name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden"
                          type="radio" name="trip-filter" value="${it.name.toLowerCase()}" ${it.isChecked ? `checked` : ``}>
                          <label class="trip-filters__filter-label" for="filter-${it.name.toLowerCase()}">${it.name}</label>
                          </div>`).join(``);
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
