const getAllNumbersIbu = (value) => {
  let newNumbers;
  for (let ibu = 1; ibu < 10; ibu += 1) {
    newNumbers.push(+value + ibu);
  }
  return newNumbers;
};

module.exports = getAllNumbersIbu;
