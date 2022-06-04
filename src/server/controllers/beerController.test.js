const Beer = require("../../db/models/beer");
const { groupOfBeer, singleBeer } = require("../../mocks/beerMocks");
const {
  getAllBeers,
  getBeerById,
  deleteBeerById,
} = require("./beerController");

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

describe("Given a getBeerById function", () => {
  describe("When it's invoked with right Id", () => {
    test("Then it should call res' status 200 and json with a beer mocked", async () => {
      Beer.findById = jest.fn().mockResolvedValue(singleBeer);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: {
          id: singleBeer.id,
        },
      };
      const expectStatus = 200;
      const expectJson = { beer: singleBeer };

      await getBeerById(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectJson);
    });
  });

  describe("When it's invoked with wrong Id", () => {
    test("Then it should call next fuction", async () => {
      Beer.findById = jest.fn().mockResolvedValue(null);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: {
          id: "wrong id",
        },
      };
      const next = jest.fn();

      await getBeerById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked and it's fails", () => {
    test("Then it should call next fuction", async () => {
      Beer.findById = jest.fn().mockRejectedValue();
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: {
          id: "wrong id",
        },
      };
      const next = jest.fn();

      await getBeerById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a deleteBeerById function", () => {
  describe("When it's invoked with right Id", () => {
    test("Then it should call res' status 202 and json with a deleted beer", async () => {
      Beer.findByIdAndDelete = jest.fn().mockResolvedValue(singleBeer);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: {
          id: singleBeer.id,
        },
      };
      const expectStatus = 202;
      const expectJson = {
        message: `La cerveza: ${singleBeer.name} ha sido borrada`,
      };

      await deleteBeerById(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectJson);
    });
  });

  describe("When it's invoked with wrong Id", () => {
    test("Then it should call next fuction", async () => {
      Beer.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: {
          id: "wrong id",
        },
      };
      const next = jest.fn();

      await deleteBeerById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked and it's fails", () => {
    test("Then it should call next fuction", async () => {
      Beer.findByIdAndDelete = jest.fn().mockRejectedValue();
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: {
          id: "wrong id",
        },
      };
      const next = jest.fn();

      await deleteBeerById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
