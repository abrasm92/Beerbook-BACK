const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllBeers,
  getBeerById,
  deleteBeerById,
  createBeer,
  updateBeerById,
  filterBeer,
} = require("../controllers/beerController");
const uploadFirebase = require("../middlewares/firebase/uploadFirebase");

const uploadUser = multer({
  dest: path.join("uploads/images/beers"),
  limits: { fileSize: 8000000 },
});

const beerRouter = express.Router();

beerRouter.get("/page/:page", getAllBeers);
beerRouter.get("/:id", getBeerById);
beerRouter.delete("/:id", deleteBeerById);
beerRouter.post("/", uploadUser.single("image"), uploadFirebase, createBeer);
beerRouter.put(
  "/:id",
  uploadUser.single("image"),
  uploadFirebase,
  updateBeerById
);
beerRouter.get("/filter/:filter/:filterValue/:page", filterBeer);

module.exports = beerRouter;
