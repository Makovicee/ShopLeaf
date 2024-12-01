const Joi = require("joi");

const idValidation = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(), // MongoDB ObjectId validation
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({
      error: "invalidId",
      details: error.details.map((detail) => detail.message),
    });
  }

  next();
};

module.exports = { idValidation };
