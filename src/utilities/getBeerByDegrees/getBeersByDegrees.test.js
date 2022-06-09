const getBeersByDegrees = require("./getBeersByDegrees");

describe("Given a getBeersByDegrees function", () => {
  describe("When it's invoked with value 'N/A'", () => {
    test("Then it should returns 0", () => {
      const value = "N/A";
      const expectReturn = 0;

      const returnedValue = getBeersByDegrees(value);

      expect(returnedValue).toEqual(expectReturn);
    });
  });

  describe("When it's invoked with value '5'", () => {
    test("Then it should returns an array of numbers", () => {
      const value = "5";
      const expectReturn = [
        "5",
        "5.1",
        "5.2",
        "5.3",
        "5.4",
        "5.5",
        "5.6",
        "5.7",
        "5.8",
        "5.9",
      ];

      const returnedValue = getBeersByDegrees(value);

      expect(returnedValue).toEqual(expectReturn);
    });
  });
});
