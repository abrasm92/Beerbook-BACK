const User = require("../../db/models/user");

const userRegister = async (req, res, next) => {
  const {
    username: newUsername,
    /* password: newPassword, */
    email: newEmail,
  } = req.body;

  const user = req.body;

  try {
    const checkUsername = await User.findOne({ username: newUsername });

    if (!checkUsername) {
      const checkEmail = await User.findOne({ email: newEmail });

      if (!checkEmail) {
        await User.create(user);
        res.status(201).json({ msg: "User created" });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { userRegister };
