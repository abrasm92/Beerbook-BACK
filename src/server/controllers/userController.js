require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../db/models/user");
const customError = require("../../utilities/customError");

const userRegister = async (req, res, next) => {
  const {
    username: newUsername,
    email: newEmail,
    password: newPassword,
  } = req.body;

  const user = req.body;

  try {
    const checkUsername = await User.findOne({ username: newUsername });

    if (!checkUsername) {
      const checkEmail = await User.findOne({ email: newEmail });

      if (!checkEmail) {
        const cryptedPassword = await bcrypt.hash(newPassword, 10);
        const newUser = { ...user, password: cryptedPassword };
        await User.create(newUser);
        res.status(201).json({ message: "User created" });
      } else {
        next(customError(409, "Este e-mail ya existe"));
      }
    } else {
      next(customError(409, "Este usuario ya existe"));
    }
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { username: currentUsername, password: currentPassword } = req.body;
  try {
    const user = await User.findOne({ username: currentUsername });

    if (user) {
      const checkPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (checkPassword) {
        const userPayload = {
          username: user.username,
          id: user.id,
        };
        const token = jsonwebtoken.sign(userPayload, process.env.JWT_SECRET);
        res.status(200).json({ token });
      } else {
        next(customError(401, "Usuario o contraseña incorrectos"));
      }
    } else {
      next(customError(401, "Usuario o contraseña incorrectos"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { userRegister, userLogin };
