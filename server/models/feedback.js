const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedback = new Schema({
  firstName: String,
  lastName: String,
  countryPhoneCode: String,
  files: String,
  phoneNumber: Number,
  countryName: String,
  email: String,
  address1: String,
  city: String,
  stateName: String,
  postalcode: String,
  confirmation: String,
  ticket: String,
  textAreaControl: String,
});

module.exports = mongoose.model("FeedBackForm", feedback);
