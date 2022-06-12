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
  getInitialFreeBeers,
} = require("../controllers/beerController");
const auth = require("../middlewares/auth/auth");
const uploadFirebase = require("../middlewares/firebase/uploadFirebase");

const uploadUser = multer({
  dest: path.join("uploads/images/beers"),
  limits: { fileSize: 8000000 },
});

const beerRouter = express.Router();

beerRouter.get("/freerandom", getInitialFreeBeers);

beerRouter.get("/page/:page", auth, getAllBeers);
beerRouter.get("/:id", auth, getBeerById);
beerRouter.delete("/:id", auth, deleteBeerById);
beerRouter.post(
  "/",
  auth,
  uploadUser.single("image"),
  uploadFirebase,
  createBeer
);
beerRouter.put(
  "/:id",
  auth,
  uploadUser.single("image"),
  uploadFirebase,
  updateBeerById
);
beerRouter.get("/filter/:filter/:filterValue/:page", auth, filterBeer);

module.exports = beerRouter;
