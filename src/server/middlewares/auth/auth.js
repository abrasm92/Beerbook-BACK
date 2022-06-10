const jsonwebtoken = require("jsonwebtoken");
const customError = require("../../../utilities/customError/customError");

require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization.includes("Bearer ")) {
      next(customError(401, "El token no tiene Bearer"));
    } else {
      const token = authorization.replace("Bearer ", "");
      const { id } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.userId = id;
      next();
    }
  } catch {
    next(customError(401, "Token no válido"));
  }
};

module.exports = auth;
