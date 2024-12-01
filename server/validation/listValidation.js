const Joi = require("joi");

const listValidationSchema = Joi.object({
  name: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      status: Joi.boolean(),
    })
  ),
  status: Joi.string(),
  members: Joi.array().items(Joi.string()),
  archived: Joi.boolean(),
});

const updateListSchema = Joi.object({
  name: Joi.string(),
  items: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      status: Joi.boolean(),
    })
  ),
  status: Joi.string(),
  members: Joi.array().items(Joi.string()),
  archived: Joi.boolean(),
});

module.exports = { listValidationSchema, updateListSchema };
