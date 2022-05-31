const { Joi } = require("express-validation");

const loginSchema = {
  body: Joi.object({
    username: Joi.string().required().alphanum(),
    password: Joi.string().required().alphanum().min(8).max(30),
  }),
};

const registerSchema = {
  body: Joi.object({
    username: Joi.string().required().alphanum(),
    password: Joi.string().required().alphanum().min(8).max(30),
    name: Joi.string().required().alphanum(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  }),
};

module.exports = { loginSchema, registerSchema };
