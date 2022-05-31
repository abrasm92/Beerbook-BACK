const chalk = require("chalk");
const debug = require("debug")("beerbook:server:middlewares:errors");

const notFoundError = (req, res) => {
  res.status(404).json({ error: true, message: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  if (error.error === "Bad Request") {
    const { body } = error.details;

    if (
      (body[0].type === "string.min" || body[0].type === "string.max") &&
      body[0].path[0] === "password"
    ) {
      res
        .status(error.statusCode)
        .json({ msg: "La contraseña debe ser entre 8 y 30 carácteres" });
    }
    if (body[0].type === "string.alphanum" && body[0].path[0] === "password") {
      res
        .status(error.statusCode)
        .json({ msg: "La contraseña debe ser alfanumérica" });
    }
    if (body[0].type === "string.alphanum" && body[0].path[0] === "username") {
      res
        .status(error.statusCode)
        .json({ msg: "El username debe ser alfanumérico" });
    }
    if (body[0].type === "string.alphanum" && body[0].path[0] === "name") {
      res
        .status(error.statusCode)
        .json({ msg: "El nombre debe ser alfanumérico" });
    }
    if (body[0].type === "string.email" && body[0].path[0] === "email") {
      res.status(error.statusCode).json({ msg: "El email no es válido" });
    }
  }
  debug(chalk.red(`Error: ${error.customMessage}`));
  const errorCode = error.statusCode ?? 500;
  const errorMessage = error.statusCode
    ? error.customMessage
    : "General error server";
  res.status(errorCode).json({ error: true, message: errorMessage });
};

module.exports = {
  notFoundError,
  generalError,
};
