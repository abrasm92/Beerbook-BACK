const express = require("express");
const { getAllBeers } = require("../controllers/beerController");

const beerRouter = express.Router();

beerRouter.get("/", getAllBeers);

module.exports = beerRouter;
