const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  homeAddress: {
    type: String, // might need to refractor into sub string, depends on the api requirements
    required: true
  },
  workAddress: {
    type: String, // might need to refractor into sub string, depends on the api requirements
    required: true
  },
  arriveToWorkBy: {
    type: Date,
    required: true
  },
  departWorkBy: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);
