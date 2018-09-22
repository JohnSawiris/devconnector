const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostnput(data) {
  let errors = {};

  // if it's empty it will pass empty string if not it will pass it as is
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
