const getAllNumbersDegrees = (valor) => {
  let newNumbers;
  for (let decimal = 1; decimal < 10; decimal += 1) {
    newNumbers.push(`${valor}.${decimal}`);
  }
  return newNumbers;
};

module.exports = getAllNumbersDegrees;
