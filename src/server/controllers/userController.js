const User = require("../../db/models/user");
const customError = require("../../utilities/customError");

const userRegister = async (req, res, next) => {
  const { username: newUsername, email: newEmail } = req.body;

  const user = req.body;

  try {
    const checkUsername = await User.findOne({ username: newUsername });

    if (!checkUsername) {
      const checkEmail = await User.findOne({ email: newEmail });

      if (!checkEmail) {
        await User.create(user);
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
