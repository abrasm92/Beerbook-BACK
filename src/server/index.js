const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/user", userRouter);

module.exports = app;
