const Beer = require("../../db/models/beer");
const { groupOfBeer } = require("../../mocks/beerMocks");
const { getAllBeers } = require("./beerController");

describe("Given a getAllBeers function", () => {
  describe("When it's invoked", () => {
    test("Then it should call res' status 200 and json with a list of 3 beers mockeds", async () => {
      Beer.find = jest.fn().mockResolvedValue(groupOfBeer);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectStatus = 200;
      const expectJson = { beers: groupOfBeer };

      await getAllBeers(null, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectJson);
    });
  });

  describe("When it's invoked and find don't found", () => {
    test("Then it should call next function", async () => {
      Beer.find = jest.fn().mockRejectedValue();
      const next = jest.fn();

      await getAllBeers(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
