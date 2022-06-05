const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const userRouter = require("./routers/userRouter");
const { notFoundError, generalError } = require("./middlewares/errors");
const beerRouter = require("./routers/beerRouter");
const auth = require("./middlewares/auth");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/user", userRouter);
app.use("/beer", auth, beerRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
