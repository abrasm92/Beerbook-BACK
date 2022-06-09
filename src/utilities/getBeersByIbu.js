const getBeersByIbu = (value) => {
  let allIbuBeerValue = value;
  let ibu;
  switch (value) {
    case "0":
      allIbuBeerValue = [value];

      for (ibu = 1; ibu < 10; ibu += 1) {
        allIbuBeerValue.push(+value + ibu);
      }
      return allIbuBeerValue;
    case "10":
      allIbuBeerValue = [value];

      for (ibu = 1; ibu < 10; ibu += 1) {
        allIbuBeerValue.push(+value + ibu);
      }
      return allIbuBeerValue;
    case "20":
      allIbuBeerValue = [value];

      for (ibu = 1; ibu < 10; ibu += 1) {
        allIbuBeerValue.push(+value + ibu);
      }
      return allIbuBeerValue;
    case "30":
      allIbuBeerValue = [value];

      for (ibu = 1; ibu < 10; ibu += 1) {
        allIbuBeerValue.push(+value + ibu);
      }
      return allIbuBeerValue;
    case "40":
      allIbuBeerValue = [value];

      for (ibu = 1; ibu < 10; ibu += 1) {
        allIbuBeerValue.push(+value + ibu);
      }
      return allIbuBeerValue;
    case "50":
      allIbuBeerValue = [value];

      for (ibu = 1; ibu < 10; ibu += 1) {
        allIbuBeerValue.push(+value + ibu);
      }
      return allIbuBeerValue;
    case "60":
      allIbuBeerValue = [value];

      for (ibu = 1; ibu < 10; ibu += 1) {
        allIbuBeerValue.push(+value + ibu);
      }
      return allIbuBeerValue;
    case "70":
      allIbuBeerValue = [value];

      for (ibu = 1; ibu < 10; ibu += 1) {
        allIbuBeerValue.push(+value + ibu);
      }
      return allIbuBeerValue;
    case "80":
      allIbuBeerValue = [value];

      for (ibu = 1; ibu < 10; ibu += 1) {
        allIbuBeerValue.push(+value + ibu);
      }
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
