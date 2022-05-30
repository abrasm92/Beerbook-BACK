const bcrypt = require("bcrypt");
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
        res.status(201).json({ msg: "User created" });
      } else {
        next(customError(409, "This email already exists"));
      }
    } else {
      next(customError(409, "This username already exists"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { userRegister };
