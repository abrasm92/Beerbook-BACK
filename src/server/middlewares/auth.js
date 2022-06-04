const customError = require("../../utilities/customError");

require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization.includes("Bearer ")) {
      next(customError(401, "El token no tiene Bearer"));
    }
    const token = authorization.replace("Bearer ", "");

    if (token !== process.env.JWT_SECRET) {
      next(customError(401, "Token no válido"));
    }
    next();
  } catch {
    next(customError(401, "Token no válido"));
  }
};

module.exports = auth;
