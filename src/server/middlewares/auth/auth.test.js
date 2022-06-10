const jsonwebtoken = require("jsonwebtoken");
const auth = require("./auth");

describe("Given a auth function", () => {
  describe("When it's invoked and without keyWord 'Bearer", () => {
    test("Then it call nextwith custom error function", () => {
      const req = {
        headers: {
          authorization: "token",
        },
      };
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked and verify don't work", () => {
    test("Then it call nextwith custom error function", () => {
      const req = {
        headers: {
          authorization: "Bearer token",
        },
      };
      const next = jest.fn();
      jest.spyOn(jsonwebtoken, "verify").mockImplementation(() => {
        throw new Error();
      });

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
