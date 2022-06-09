const getAllNumbersIbu = require("./getAllNumbersIbu");

const getBeersByIbu = (value) => {
  let allIbuBeerValue;
  let ibu;
  if (value !== "90") {
    allIbuBeerValue = getAllNumbersIbu(value);
    return allIbuBeerValue;
  }
  allIbuBeerValue = [+value];
  for (ibu = 1; ibu < 11; ibu += 1) {
    allIbuBeerValue.push(+value + ibu);
  }
  return allIbuBeerValue;
};

module.exports = getBeersByIbu;
