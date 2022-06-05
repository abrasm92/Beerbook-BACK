const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllBeers,
  getBeerById,
  deleteBeerById,
  createBeer,
} = require("../controllers/beerController");

const uploadUser = multer({ dest: path.join("uploads/images/beers") });

const beerRouter = express.Router();

beerRouter.get("/", getAllBeers);
beerRouter.get("/:id", getBeerById);
beerRouter.delete("/:id", deleteBeerById);
beerRouter.post("/", uploadUser.single("image"), createBeer);

module.exports = beerRouter;
