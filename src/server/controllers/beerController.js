const Beer = require("../../db/models/beer");

const getAllBeers = async (req, res, next) => {
  try {
    const beers = await Beer.find();
    res.status(200).json({ beers });
  } catch (error) {
    next(error);
  }
};

const getBeerById = async (req, res, next) => {
  const { id: currentId } = req.params;

  try {
    const beer = await Beer.findById(currentId);
    res.status(200).json({ beer });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBeers, getBeerById };
