const Beer = require("../../db/models/beer");
const { groupOfBeer, singleBeer } = require("../../mocks/beerMocks");
const {
  getAllBeers,
  getBeerById,
  deleteBeerById,
  createBeer,
  updateBeerById,
  filterBeer,
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
      const expectJson = { beersOnPage: groupOfBeer, totalPages: 1 };
      const req = {
        params: { page: 0 },
      };

      await getAllBeers(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectJson);
    });
  });

  describe("When it's invoked and find don't found", () => {
    test("Then it should call next function", async () => {
      Beer.find = jest.fn().mockRejectedValue();
      const next = jest.fn();
      const req = {
        params: "0",
      };

      await getAllBeers(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked and find returns and array length 0", () => {
    test("Then it should call next function", async () => {
      Beer.find = jest.fn().mockResolvedValue([]);
      const next = jest.fn();
      const req = {
        params: "0",
      };

      await getAllBeers(req, null, next);

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

describe("Given a createBeer function", () => {
  describe("When its invoked with a right beer", () => {
    test("Then it should call res' method status 201 and a message", async () => {
      const expectedMessage = `La cerveza: ${singleBeer.name} ha sido añadida`;
      const expectStatus = 201;
      const userID = "23458jh2j53j";
      Beer.create = jest.fn().mockResolvedValue(singleBeer);
      const req = {
        userId: userID,
        body: singleBeer,
        image: "asdf",
        imageBackup: "firebase-asdf",
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createBeer(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith({
        message: expectedMessage,
        beer: singleBeer,
      });
    });
  });

  describe("When its invoked and something fails", () => {
    test("Then it should call next function", async () => {
      const userID = "23458jh2j53j";
      Beer.create = jest.fn().mockRejectedValue();
      const req = {
        image: "asdf",
        imageBackup: "firebase-asdf",
        userId: userID,
        body: singleBeer,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await createBeer(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a updateBeerById function", () => {
  describe("When it's invoked with a file", () => {
    test("Then it should call res' status 200 and  json with a message", async () => {
      const expectedMessage = `La cerveza: ${singleBeer.name} ha sido modificada`;
      const expectStatus = 200;
      const imageFile = "fake-file.png";
      Beer.findByIdAndUpdate = jest.fn().mockResolvedValue(singleBeer);
      Beer.findById = jest.fn().mockResolvedValue(singleBeer);
      const req = {
        file: {
          originalname: imageFile,
        },
        image: "asdf",
        imageBackup: "firebase-asdf",
        body: singleBeer,
        params: { id: "21341243jlhhgljh12" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await updateBeerById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith({
        message: expectedMessage,
        beer: singleBeer,
      });
    });
  });

  describe("When it's invoked withoud a file", () => {
    test("Then it should call res' status 200 and  json with a message", async () => {
      const expectedMessage = `La cerveza: ${singleBeer.name} ha sido modificada`;
      const expectStatus = 200;
      Beer.findByIdAndUpdate = jest.fn().mockResolvedValue(singleBeer);
      Beer.findById = jest.fn().mockResolvedValue(singleBeer);
      const req = {
        body: singleBeer,
        params: { id: "21341243jlhhgljh12" },
        image: "asdf",
        imageBackup: "firebase-asdf",
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await updateBeerById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith({
        message: expectedMessage,
        beer: singleBeer,
      });
    });
  });

  describe("When it's invoked and somethink fail", () => {
    test("Then it should call next function", async () => {
      Beer.findByIdAndUpdate = jest.fn().mockRejectedValue();
      Beer.findById = jest.fn().mockResolvedValue(singleBeer);
      const req = {
        body: singleBeer,
        params: { id: "21341243jlhhgljh12" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await updateBeerById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a filterBeer function", () => {
  describe("When it's invoked with filter.params = 'brewery' andfilterValue = 'Brewdog' and a page", () => {
    test("Then it should call res' status 200 and json with a beer", async () => {
      Beer.find = jest.fn().mockResolvedValue([singleBeer]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectStatus = 200;
      const expectJson = { beersOnPage: [singleBeer], totalPages: 1 };
      const req = {
        params: { filter: "brewery", filterValue: "Brewdog", page: 0 },
      };

      await filterBeer(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectJson);
    });
  });

  describe("When it's invoked with filter.params = 'brewery' andfilterValue = 'Brewdog' and a page and it's return void array", () => {
    test("Then it should call next function", async () => {
      Beer.find = jest.fn().mockResolvedValue([]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: { filter: "brewery", filterValue: "Brewdog", page: 0 },
      };
      const next = jest.fn();

      await filterBeer(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with filter.params = 'style' andfilterValue = 'Blonde' and a page", () => {
    test("Then it should call res' status 200 and json with a beer", async () => {
      Beer.find = jest.fn().mockResolvedValue([singleBeer]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectStatus = 200;
      const expectJson = { beersOnPage: [singleBeer], totalPages: 1 };
      const req = {
        params: { filter: "style", filterValue: "Blonde", page: 0 },
      };

      await filterBeer(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectJson);
    });
  });

  describe("When it's invoked with filter.params = 'style' andfilterValue = 'blonde' and a page and it's return void array", () => {
    test("Then it should call next function", async () => {
      Beer.find = jest.fn().mockResolvedValue([]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: { filter: "style", filterValue: "Blonde", page: 0 },
      };
      const next = jest.fn();

      await filterBeer(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with filter.params = 'degrees' andfilterValue = '6' and a page", () => {
    test("Then it should call res' status 200 and json with a beer", async () => {
      Beer.find = jest.fn().mockResolvedValue([singleBeer]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectStatus = 200;
      const expectJson = { beersOnPage: [singleBeer], totalPages: 1 };
      const req = {
        params: { filter: "degrees", filterValue: "6", page: 0 },
      };

      await filterBeer(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectJson);
    });
  });

  describe("When it's invoked with filter.params = 'degrees' andfilterValue = '6' and a page and it's return void array", () => {
    test("Then it should call next function", async () => {
      Beer.find = jest.fn().mockResolvedValue([]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: { filter: "degrees", filterValue: "6", page: 0 },
      };
      const next = jest.fn();

      await filterBeer(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with filter.params = 'IBU' andfilterValue = '20' and a page", () => {
    test("Then it should call res' status 200 and json with a beer", async () => {
      Beer.find = jest.fn().mockResolvedValue([singleBeer]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectStatus = 200;
      const expectJson = { beersOnPage: [singleBeer], totalPages: 1 };
      const req = {
        params: { filter: "IBU", filterValue: "20", page: 0 },
      };

      await filterBeer(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectJson);
    });
  });

  describe("When it's invoked with filter.params = 'IBU' andfilterValue = '20' and a page and it's return void array", () => {
    test("Then it should call next function", async () => {
      Beer.find = jest.fn().mockResolvedValue([]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: { filter: "IBU", filterValue: "20", page: 0 },
      };
      const next = jest.fn();

      await filterBeer(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with filter.params = 'country' andfilterValue = 'EEUU' and a page", () => {
    test("Then it should call res' status 200 and json with a beer", async () => {
      Beer.find = jest.fn().mockResolvedValue([singleBeer]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectStatus = 200;
      const expectJson = { beersOnPage: [singleBeer], totalPages: 1 };
      const req = {
        params: { filter: "country", filterValue: "EEUU", page: 0 },
      };

      await filterBeer(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectJson);
    });
  });

  describe("When it's invoked with filter.params = 'country' andfilterValue = 'EEUU' and a page and it's return void array", () => {
    test("Then it should call next function", async () => {
      Beer.find = jest.fn().mockResolvedValue([]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: { filter: "country", filterValue: "EEUU", page: 0 },
      };
      const next = jest.fn();

      await filterBeer(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with filter.params = 'randomValue' andfilterValue = 'EEUU' and a page and it's return void array", () => {
    test("Then it should call next function", async () => {
      Beer.find = jest.fn().mockResolvedValue([]);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: { filter: "randomValue", filterValue: "EEUU", page: 0 },
      };
      const next = jest.fn();

      await filterBeer(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with filter.params = 'country' andfilterValue = 'EEUU' and a page and and something fail", () => {
    test("Then it should call next function", async () => {
      Beer.find = jest.fn().mockRejectedValue();
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = {
        params: { filter: "country", filterValue: "EEUU", page: 0 },
      };
      const next = jest.fn();

      await filterBeer(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
