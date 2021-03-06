const Beer = require("../../db/models/beer");
const beerpage = require("../../utilities/beerPage/beerPage");
const customError = require("../../utilities/customError/customError");
const getBeersByDegrees = require("../../utilities/getBeerByDegrees/getBeersByDegrees");
const getBeersByIbu = require("../../utilities/getBeerByIbu/getBeersByIbu");
const getRandomInitialBeers = require("../../utilities/getRandomInitialBeers/getRandomInitialBeers");

const getAllBeers = async (req, res, next) => {
  const { page } = req.params;
  try {
    const beers = await Beer.find();

    if (beers.length === 0) {
      const error = customError(404, "No se ha encontrado ninguna cerveza");
      next(error);
    } else {
      const response = beerpage(beers, page);
      res.status(200).json(response);
    }
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
  const ownerId = req.userId;
  const newImage = req.image;
  const newImageBackup = req.imageBackup;

  try {
    const newBeer = {
      ...beer,
      owner: ownerId,
      imageBackup: newImageBackup,
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
  const currentBeer = await Beer.findById(id);
  const newImage = req.image;
  const newImageBackup = req.imageBackup;
  try {
    if (!file) {
      const updateBeer = {
        ...beer,
        image: currentBeer.image,
        imageBackup: currentBeer.imageBackup,
      };
      await Beer.findByIdAndUpdate(id, updateBeer);
      const beerToUpdate = await Beer.findById(id);

      res.status(200).json({
        message: `La cerveza: ${beerToUpdate.name} ha sido modificada`,
        beer: beerToUpdate,
      });
    } else {
      const updateBeer = {
        ...beer,
        image: newImage,
        imageBackup: newImageBackup,
      };
      await Beer.findByIdAndUpdate(id, updateBeer);
      const beerToUpdate = await Beer.findById(id);

      res.status(200).json({
        message: `La cerveza: ${beerToUpdate.name} ha sido modificada`,
        beer: beerToUpdate,
      });
    }
  } catch (error) {
    next(error);
  }
};

const filterBeer = async (req, res, next) => {
  const { filter, filterValue, page } = req.params;
  try {
    let filteredBeers;
    let response;
    let beerByDegrees;
    let beerByIbu;
    switch (filter) {
      case "brewery":
        filteredBeers = await Beer.find({ brewery: filterValue });
        if (filteredBeers.length === 0) {
          const error = customError(404, "No se ha encontrado ninguna cerveza");
          next(error);
        } else {
          response = beerpage(filteredBeers, +page);
          res.status(200).json(response);
        }
        break;
      case "style":
        filteredBeers = await Beer.find({ style: filterValue, filterValue });
        if (filteredBeers.length === 0) {
          const error = customError(404, "No se ha encontrado ninguna cerveza");
          next(error);
        } else {
          response = beerpage(filteredBeers, +page);
          res.status(200).json(response);
        }
        break;
      case "degrees":
        beerByDegrees = getBeersByDegrees(filterValue);
        filteredBeers = await Beer.find({ degrees: beerByDegrees });
        if (filteredBeers.length === 0) {
          const error = customError(404, "No se ha encontrado ninguna cerveza");
          next(error);
        } else {
          response = beerpage(filteredBeers, +page);
          res.status(200).json(response);
        }
        break;
      case "IBU":
        beerByIbu = getBeersByIbu(filterValue);
        filteredBeers = await Beer.find({ IBU: beerByIbu });
        if (filteredBeers.length === 0) {
          const error = customError(404, "No se ha encontrado ninguna cerveza");
          next(error);
        } else {
          response = beerpage(filteredBeers, +page);
          res.status(200).json(response);
        }
        break;
      case "country":
        filteredBeers = await Beer.find({ country: filterValue });
        if (filteredBeers.length === 0) {
          const error = customError(404, "No se ha encontrado ninguna cerveza");
          next(error);
        } else {
          response = beerpage(filteredBeers, +page);
          res.status(200).json(response);
        }
        break;
      default:
        next(
          customError(404, "No hay ningun filtro disponible con este nombre")
        );
    }
  } catch (error) {
    next(error);
  }
};

const getInitialFreeBeers = async (req, res, next) => {
  try {
    const beers = await Beer.find();
    if (beers.length === 0) {
      next(customError(404, "No se han encontrado cervezas"));
    } else {
      const initialBeers = getRandomInitialBeers(beers);

      res.status(200).json({ beers: initialBeers });
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
  filterBeer,
  getInitialFreeBeers,
};
