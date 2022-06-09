const getBeersByIbu = require("./getBeersByIbu");

describe("Given a getBeersByIbu function", () => {
  describe("When it's invoked with value === 90", () => {
    test("Then it should return an array of numbers to search", () => {
      const value = "90";
      const expectedValue = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

      const returnedValue = getBeersByIbu(value);

      expect(expectedValue).toEqual(returnedValue);
    });
  });

  describe("When it's invoked with value !== 90", () => {
    test("Then it should return an array of numbers to search", () => {
      const value = "40";
      const expectedValue = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49];

      const returnedValue = getBeersByIbu(value);

      expect(expectedValue).toEqual(returnedValue);
    });
  });
});
