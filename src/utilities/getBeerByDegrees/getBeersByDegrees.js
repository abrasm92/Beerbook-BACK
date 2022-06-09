const getAllNumbersDegrees = require("./getAllNumbersDegrees");

const getBeersByDegrees = (valor) => {
  let allDegreesBeerValue = [valor];

  if (valor === "N/A") {
    allDegreesBeerValue = 0;
    return allDegreesBeerValue;
  }
  allDegreesBeerValue.push(getAllNumbersDegrees(valor));
  return allDegreesBeerValue;
};

module.exports = getBeersByDegrees;
