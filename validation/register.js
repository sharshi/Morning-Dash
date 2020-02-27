const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {

  let errors = {};
  data.handle = validText(data.handle) ? data.handle : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";
  data.homeAddress = validText(data.homeAddress) ? data.homeAddress : "";
  data.workAddress = validText(data.workAddress) ? data.workAddress : "";
  // data.arriveToWorkBy = validText(data.arriveToWorkBy)
  //   ? data.arriveToWorkBy
  //   : "";
  // data.departWorkBy = validText(data.departWorkBy) ? data.departWorkBy : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Handle must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (Validator.isEmpty(data.workAddress)) {
    errors.workAddress = "Work address field is required";
  }

  if (Validator.isEmpty(data.arriveToWorkBy.toString())) {
    // console.log(data)
    errors.arriveToWorkBy = "Arrive to work by field is required";
  }

  if (Validator.isEmpty(data.departWorkBy.toString())) {
    errors.departWorkBy = "Depart work by field is required";
  }

  if (Validator.isEmpty(data.homeAddress)) {
    errors.homeAddress = "Home Address field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
