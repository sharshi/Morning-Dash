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
    type: String,
    required: true
  },
  workAddress: {
    type: String,
    required: true
  },
  arriveToWorkBy:[ {
    type: Number,
    required: true
  }],
  departWorkBy: [{
    type: Number,
    required: true
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);
