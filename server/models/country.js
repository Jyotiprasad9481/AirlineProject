const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  country_id: { type: Number },
  sortname: { type: String },
  dial_code: { type: String },
  country_name: { type: String },
  states: { type: Array },
});

module.exports = mongoose.model("country", userSchema);
