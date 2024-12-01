const validateDtoIn = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // Validate req.body
    if (error) {
      return res.status(400).json({
        error: "invalidDtoIn",
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
};

module.exports = { validateDtoIn };
