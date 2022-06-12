const getRandomInitialBeers = (beers) => {
  const totalBeers = beers.length - 1;
  const indexesOfBeers = [];
  const randomBeers = [];

  for (let beer = 0; beer < 16; beer += 1) {
    const randomIndex = Math.floor(Math.random() * totalBeers);
    if (!indexesOfBeers.includes(randomIndex)) {
      indexesOfBeers.push(randomIndex);
    } else {
      beer -= 1;
    }
  }

  for (let index = 0; index < 16; index += 1) {
    const currentBeer = beers.slice(
      indexesOfBeers[index],
      indexesOfBeers[index] + 1
    );
    randomBeers.push(currentBeer);
  }

  return randomBeers;
};

module.exports = getRandomInitialBeers;
