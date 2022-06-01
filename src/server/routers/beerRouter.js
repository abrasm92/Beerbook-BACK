const express = require("express");
const { getAllBeers, getBeerById } = require("../controllers/beerController");

const beerRouter = express.Router();

beerRouter.get("/", getAllBeers);
beerRouter.get("/:id", getBeerById);

module.exports = beerRouter;
