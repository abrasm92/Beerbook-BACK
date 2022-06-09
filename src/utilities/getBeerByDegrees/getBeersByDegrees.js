const getAllNumbersDegrees = require("./getAllNumbersDegrees");

const getBeersByDegrees = (valor) => {
  let allDegreesBeerValue;

  if (valor === "N/A") {
    allDegreesBeerValue = 0;
    return allDegreesBeerValue;
  }
  allDegreesBeerValue = getAllNumbersDegrees(valor);
  return allDegreesBeerValue;
};

module.exports = getBeersByDegrees;
