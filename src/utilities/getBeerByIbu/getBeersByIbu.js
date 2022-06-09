const getAllNumbersIbu = require("./getAllNumbersIbu");

const getBeersByIbu = (value) => {
  let allIbuBeerValue = [value];
  let ibu;
  switch (value) {
    case "0":
      allIbuBeerValue.push(getAllNumbersIbu(value));
      return allIbuBeerValue;
    case "10":
      allIbuBeerValue.push(getAllNumbersIbu(value));
      return allIbuBeerValue;
    case "20":
      allIbuBeerValue.push(getAllNumbersIbu(value));
      return allIbuBeerValue;
    case "30":
      allIbuBeerValue.push(getAllNumbersIbu(value));
      return allIbuBeerValue;
    case "40":
      allIbuBeerValue.push(getAllNumbersIbu(value));
      return allIbuBeerValue;
    case "50":
      allIbuBeerValue.push(getAllNumbersIbu(value));
      return allIbuBeerValue;
    case "60":
      allIbuBeerValue.push(getAllNumbersIbu(value));
      return allIbuBeerValue;
    case "70":
      allIbuBeerValue.push(getAllNumbersIbu(value));
      return allIbuBeerValue;
    case "80":
      allIbuBeerValue.push(getAllNumbersIbu(value));
      return allIbuBeerValue;
    case "90":
      allIbuBeerValue = [value];
      for (ibu = 1; ibu < 11; ibu += 1) {
        allIbuBeerValue.push(+value + ibu);
      }
      return allIbuBeerValue;
    default:
      allIbuBeerValue = [value];
      return allIbuBeerValue;
  }
};

module.exports = getBeersByIbu;
