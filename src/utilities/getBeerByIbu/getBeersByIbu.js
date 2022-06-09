const getAllNumbersIbu = require("./getAllNumbersIbu");

const getBeersByIbu = (value) => {
  const allIbuBeerValue = [value];
  let ibu;
  if (value === "90") {
    for (ibu = 1; ibu < 11; ibu += 1) {
      allIbuBeerValue.push(+value + ibu);
    }
    return allIbuBeerValue;
  }
  allIbuBeerValue.push(getAllNumbersIbu(value));
  return allIbuBeerValue;
};

module.exports = getBeersByIbu;
