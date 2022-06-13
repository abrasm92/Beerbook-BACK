const { longGroupOfBeers } = require("../../mocks/beerMocks");
const getRandomInitialBeers = require("./getRandomInitialBeers");

describe("Given a getRandomInitialBeers function", () => {
  describe("When it's invoked with a list of beers", () => {
    test("Then it sould return a new list of 16 beers", () => {
      const expectLengthList = 16;

      const listOfBeers = getRandomInitialBeers(longGroupOfBeers);

      expect(listOfBeers).toHaveLength(expectLengthList);
    });
  });
});
