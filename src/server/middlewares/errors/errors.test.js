const { notFoundError, generalError } = require("./errors");

describe("Given, a notFoundError function", () => {
  describe("When it's invoked", () => {
    test("Then it should call res' status method with 404 and a message 'Endpoint not found'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedStatus = 404;
      const expectedMessage = { error: true, message: "Endpoint not found" };

      await notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});

describe("Given a generalError function", () => {
  describe("When it's invoked", () => {
    test("Then it should call res' status method with 500 and message 'General error server'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedStatus = 500;
      const expectedMessage = { error: true, message: "General error server" };
      const error = new Error();

      await generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's invoked with error with custom message 'hi' and custom error code 409", () => {
    test("Then it should call res' status method with 409 and message 'hi'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedStatus = 409;
      const expectedMessage = { error: true, message: "hi" };
      const error = new Error();
      error.customMessage = "hi";
      error.statusCode = 409;

      await generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's invoked with a bad request error from schema by short password", () => {
    test("Then it should call res' status method woth 400 and a message 'La contrase??a debe ser entre 8 y 30 car??cteres'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = {
        error: "Bad Request",
        statusCode: 400,
        details: {
          body: [{ type: "string.min", path: ["password"] }],
        },
      };
      const expectedStatus = 400;
      const expectedMessage = {
        message: "La contrase??a debe ser entre 8 y 30 car??cteres",
      };

      await generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's invoked with a bad request error from schema by long password", () => {
    test("Then it should call res' status method woth 400 and a message 'La contrase??a debe ser entre 8 y 30 car??cteres'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = {
        error: "Bad Request",
        statusCode: 400,
        details: {
          body: [{ type: "string.max", path: ["password"] }],
        },
      };
      const expectedStatus = 400;
      const expectedMessage = {
        message: "La contrase??a debe ser entre 8 y 30 car??cteres",
      };

      await generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's invoked with a bad request error from schema by not alphanumeric password", () => {
    test("Then it should call res' status method woth 400 and a message 'La contrase??a debe ser alfanum??rica'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = {
        error: "Bad Request",
        statusCode: 400,
        details: {
          body: [{ type: "string.alphanum", path: ["password"] }],
        },
      };
      const expectedStatus = 400;
      const expectedMessage = {
        message: "La contrase??a debe ser alfanum??rica",
      };

      await generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's invoked with a bad request error from schema by not alphanumeric username", () => {
    test("Then it should call res' status method woth 400 and a message 'El username debe ser alfanum??rico'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = {
        error: "Bad Request",
        statusCode: 400,
        details: {
          body: [{ type: "string.alphanum", path: ["username"] }],
        },
      };
      const expectedStatus = 400;
      const expectedMessage = {
        message: "El username debe ser alfanum??rico",
      };

      await generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's invoked with a bad request error from schema by not alphanumeric name", () => {
    test("Then it should call res' status method woth 400 and a message 'El nombre debe ser alfanum??rico'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = {
        error: "Bad Request",
        statusCode: 400,
        details: {
          body: [{ type: "string.alphanum", path: ["name"] }],
        },
      };
      const expectedStatus = 400;
      const expectedMessage = {
        message: "El nombre debe ser alfanum??rico",
      };

      await generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's invoked with a bad request error from schema by invalid email", () => {
    test("Then it should call res' status method woth 400 and a message 'El email no es v??lido'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = {
        error: "Bad Request",
        statusCode: 400,
        details: {
          body: [{ type: "string.email", path: ["email"] }],
        },
      };
      const expectedStatus = 400;
      const expectedMessage = {
        message: "El email no es v??lido",
      };

      await generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
