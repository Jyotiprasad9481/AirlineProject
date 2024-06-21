const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // _id: { type: Object },
  airlineProgram: { type: String },
  email: { type: String },
  password: { type: String },
  ffn: { type: String },
  firstName: { type: String },
  midName: { type: String },
  lastName: { type: String },
  countryPhoneCode: { type: String },
  phoneNumber: { type: Number },
  countryName: { type: String },
  address1: { type: String },
  city: { type: String },
  stateName: { type: String },
  postalcode: { type: Number },
  demo:{type:String},
  confirmationId: { type: String },
  ticket: { type: String },
  additionalDetails: { type: String },
  attachment: [{ type: String }],
  likeAReply: { type: Boolean },
  complete: { type: Boolean }
});

module.exports = mongoose.model("pinfo", userSchema);
