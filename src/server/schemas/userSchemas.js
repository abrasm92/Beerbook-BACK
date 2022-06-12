const { Joi } = require("express-validation");

const loginSchema = {
  body: Joi.object({
    username: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9\d\-_\s]+$/),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9\d\-_\s]+$/)
      .min(8)
      .max(30),
  }),
};

const registerSchema = {
  body: Joi.object({
    username: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9\d\-_\s]+$/),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9\d\-_\s]+$/)
      .min(8)
      .max(30),
    name: Joi.string()
      .required()
      .regex(/^[a-zA-Z\d\-_\s]+$/),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "es"] },
      })
      .required(),
  }),
};

module.exports = { loginSchema, registerSchema };
