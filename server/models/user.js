const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: { type: String },
  airlineProgram: {type: String},
  email: { type: String, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  countryPhoneCode: { type: String },
  phoneNumber: { type: Number },
  countryName: { type: String },
  address1: { type: String },
  city: { type: String },
  stateName: { type: String },
  postalcode: { type: Number },
  craeted_at: { type: Number, default: Date.now().valueOf() },
  updated_at: { type: Number, default: Date.now().valueOf() },
  formId: { type: String }
});

module.exports = mongoose.model("User", userSchema);

// "displayName":"Jyotiprasad",
// "email":"Jyotiprasad@gmail.com",
// "password":"Jyoti@9481",
//
