const express = require("express");
const { validate } = require("express-validation");
const { userRegister, userLogin } = require("../controllers/userController");
const { registerSchema, loginSchema } = require("../schemas/userSchemas");

const userRouter = express.Router();

userRouter.post("/register", validate(registerSchema), userRegister);
userRouter.post("/login", validate(loginSchema), userLogin);

module.exports = userRouter;
