const Beer = require("../../db/models/beer");
const customError = require("../../utilities/customError");

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
    if (beer) {
      res.status(200).json({ beer });
    } else {
      next(customError(404, "Id beer found"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBeers, getBeerById };
