const User = require("../../db/models/user");
const { singleUser } = require("../../mocks/userMocks");
const { userRegister } = require("./userController");

describe("Given a userRegister function", () => {
  describe("When it's invoked with a user credential on a req' body", () => {
    test("Then it call res' method status 201 and method json with a message 'User created'", async () => {
      User.findOne = jest.fn().mockResolvedValueOnce(null);
      User.create = jest.fn().mockResolvedValue(singleUser);
      const req = {
        body: singleUser,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
      const expectStatusValue = 201;
      const expectJson = { msg: "User created" };

      await userRegister(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectStatusValue);
      expect(res.json).toHaveBeenCalledWith(expectJson);
    });
  });

  describe("When it's called but the username already exist", () => {
    test("Then it call next function", async () => {
      User.findOne = jest.fn().mockResolvedValue(singleUser);
      const req = {
        body: singleUser,
      };
      const next = jest.fn();
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userRegister(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's called but the email already exist", () => {
    test("Then it call next function", async () => {
      User.findOne = jest
        .fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(singleUser);
      const req = {
        body: singleUser,
      };
      const next = jest.fn();
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userRegister(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's called but findOne functions fails", () => {
    test("Then it call next function", async () => {
      User.findOne = jest.fn().mockRejectedValue();
      const next = jest.fn();
      const req = {
        body: singleUser,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userRegister(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
