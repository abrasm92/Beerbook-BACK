const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const userRouter = require("./routers/userRouter");
const beerRouter = require("./routers/beerRouter");
const { notFoundError, generalError } = require("./middlewares/errors/errors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use("/user", userRouter);
app.use("/beer", beerRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
