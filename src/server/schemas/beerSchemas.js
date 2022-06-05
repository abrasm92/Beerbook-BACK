const { Joi } = require("express-validation");

const createBeerSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    brewery: Joi.string().required(),
    style: Joi.string().required(),
    degrees: Joi.number().required().min(0).max(30),
    IBU: Joi.number().required().min(0).max(100),
    country: Joi.string().required(),
    description: Joi.string().required(),
  }),
  file: Joi.string().required(),
};

module.exports = { createBeerSchema };
