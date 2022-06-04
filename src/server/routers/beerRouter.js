const express = require("express");
const {
  getAllBeers,
  getBeerById,
  deleteBeerById,
} = require("../controllers/beerController");

const beerRouter = express.Router();

beerRouter.get("/", getAllBeers);
beerRouter.get("/:id", getBeerById);
beerRouter.delete("/:id", deleteBeerById);

module.exports = beerRouter;
