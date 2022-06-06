const fs = require("fs");
const path = require("path");
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
      next(customError(404, "Cerveza no encontrada"));
    }
  } catch (error) {
    next(error);
  }
};

const deleteBeerById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBeer = await Beer.findByIdAndDelete(id);
    if (deletedBeer) {
      res
        .status(202)
        .json({ message: `La cerveza: ${deletedBeer.name} ha sido borrada` });
    } else {
      next(customError(404, "La cerveza que busca borrar no se encuentra"));
    }
  } catch (error) {
    next(error);
  }
};

const createBeer = async (req, res, next) => {
  const beer = req.body;
  const { file } = req;
  const prefixImage = Date.now();
  const ownerId = req.userId;
  try {
    fs.rename(
      path.join("uploads", "images", "beers", file.filename),
      path.join(
        "uploads",
        "images",
        "beers",
        `${prefixImage}-${file.originalname}`
      ),
      (error) => {
        if (error) {
          next(error);
        }
      }
    );
    const newImage = `images/users/${prefixImage}-${file.originalname}`;
    const newBeer = {
      ...beer,
      owner: ownerId,
      image: newImage,
    };
    const createdBeer = await Beer.create(newBeer);

    res.status(201).json({
      message: `La cerveza: ${createdBeer.name} ha sido añadida`,
      beer: createdBeer,
    });
  } catch (error) {
    next(error);
  }
};

const updateBeerById = async (req, res, next) => {
  const beer = req.body;
  const { id } = req.params;
  const { file } = req;
  const prefixImage = Date.now();
  const currentBeer = await Beer.findById(id);
  try {
    if (typeof file === "undefined") {
      const updateBeer = {
        ...beer,
        image: currentBeer.image,
      };
      const beerToUpdate = await Beer.findByIdAndUpdate(id, updateBeer);
      res.status(204).json({
        message: `La cerveza: ${beerToUpdate.name} ha sido modificada`,
        beer: beerToUpdate,
      });
    } else {
      fs.rename(
        path.join("uploads", "images", "beers", file.filename),
        path.join(
          "uploads",
          "images",
          "beers",
          `${prefixImage}-${file.originalname}`
        ),
        (error) => {
          if (error) {
            next(error);
          }
        }
      );
      const newImage = `images/users/${prefixImage}-${file.originalname}`;
      const updateBeer = {
        ...beer,
        image: newImage,
      };
      const beerToUpdate = await Beer.findByIdAndUpdate(id, updateBeer);
      res.status(204).json({
        message: `La cerveza: ${beerToUpdate.name} ha sido modificada`,
        beer: beerToUpdate,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBeers,
  getBeerById,
  deleteBeerById,
  createBeer,
  updateBeerById,
};
