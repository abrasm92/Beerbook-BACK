const customError = require("./customError");

describe("Given a customError function", () => {
  describe("When it's invoked", () => {
    test("Then it sholud return an error", () => {
      const expectEqualityError = new Error();

      const customErrorResult = customError();

      expect(customErrorResult).toEqual(expectEqualityError);
    });
  });

  describe("When it's invoked with a custom statusCode", () => {
    test("Then it sholud return an error with a custom statusCode", () => {
      const error = new Error();
      error.statusCode = 409;
      const expectStatusError = error.statusCode;

      const customErrorResult = customError(409);

      expect(customErrorResult.statusCode).toEqual(expectStatusError);
    });
  });

  describe("When it's invoked with a custom statusCode", () => {
    test("Then it sholud return an error with a custom statusCode", () => {
      const error = new Error();
      error.statusCode = 409;
      error.customMessage = "this is a custom message";
      const expectMessageError = error.customMessage;

      const customErrorResult = customError(409, "this is a custom message");

      expect(customErrorResult.customMessage).toEqual(expectMessageError);
    });
  });
});
