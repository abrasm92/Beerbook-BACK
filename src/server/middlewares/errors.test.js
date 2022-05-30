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
});
