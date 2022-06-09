const beerpage = (beers, page) => {
  const totalPages = Math.ceil(beers.length / 16);
  const initialIndex = page * 16;
  const finishedIndex = initialIndex + 16;

  const beersOnPage = beers.slice(initialIndex, finishedIndex);

  return { beersOnPage, totalPages };
};

module.exports = beerpage;
