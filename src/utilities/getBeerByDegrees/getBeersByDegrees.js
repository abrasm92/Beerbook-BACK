const getAllNumbersDegrees = require("./getAllNumbersDegrees");

const getBeersByDegrees = (valor) => {
  let allDegreesBeerValue = [valor];

  switch (valor) {
    case "NA":
      allDegreesBeerValue = 0;
      return allDegreesBeerValue;
    case "0":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "1":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "2":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "3":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "4":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "5":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "6":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "7":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "8":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "9":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "10":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "11":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "12":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "13":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "14":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "15":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "16":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "17":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "18":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "19":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    case "20":
      allDegreesBeerValue.push(getAllNumbersDegrees(valor));
      return allDegreesBeerValue;
    default:
      return allDegreesBeerValue;
  }
};

module.exports = getBeersByDegrees;
