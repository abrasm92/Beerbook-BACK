const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../db/models/user");
const { singleUser, adminMock, userData } = require("../../mocks/userMocks");
const { userRegister, userLogin, getUserById } = require("./userController");

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue(() => "mockPasswordEncrypted"),
}));

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
      const expectJson = { message: "User created" };

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

describe("Given userLogin function", () => {
  describe("When it's called with correct user credentials", () => {
    test("Then it should call response method status with 200 and method json with a token", async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      User.findOne = jest.fn().mockResolvedValue(adminMock);
      const req = {
        body: {
          username: adminMock.username,
          password: adminMock.password,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const token = "mockToken";
      jest.spyOn(jsonwebtoken, "sign").mockReturnValue(token);
      const expectedStatus = 200;

      await userLogin(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it's called with incorrect username", () => {
    test("Then it should call next method with 'Incorrect username or password'", async () => {
      User.findOne = jest.fn().mockResolvedValue(false);
      const req = {
        body: singleUser,
      };
      const next = jest.fn();

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's called with incorrect password", () => {
    test("Then it should call next method with 'Incorrect username or password'", async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      User.findOne = jest.fn().mockResolvedValue({ ...singleUser, id: 1 });
      const req = {
        body: { ...singleUser, username: "admin" },
      };
      const next = jest.fn();

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's called and findOne crash", () => {
    test("Then it should call next ", async () => {
      User.findOne = jest.fn().mockRejectedValue();
      const req = {
        body: { ...singleUser, username: "admin" },
      };
      const next = jest.fn();

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a getUserById function", () => {
  describe("When its invoked with id on req's params and it exists", () => {
    test("Then its should call res' status 200 and json with a userData", async () => {
      User.findById = jest.fn().mockResolvedValue(userData);
      const expectedUser = { ...userData };
      delete expectedUser.password;
      delete expectedUser.id;
      expectedUser.favorites = 2;
      expectedUser.creations = 3;
      const expectResponse = { user: expectedUser };
      const expectStatus = 200;
      const req = {
        params: {
          id: "1234",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectResponse);
    });
  });

  describe("When its invoked with id on req's params and it dosen't exists", () => {
    test("Then its should call next", async () => {
      User.findById = jest.fn().mockResolvedValue(null);
      const next = jest.fn();
      const req = {
        params: {
          id: "1234",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getUserById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When its invoked with id on req's params but findById fails", () => {
    test("Then its should call next", async () => {
      User.findById = jest.fn().mockRejectedValue();
      const next = jest.fn();
      const req = {
        params: {
          id: "1234",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getUserById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
