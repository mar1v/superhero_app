const mongoose = require("mongoose");

const superheroSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  real_name: { type: String, required: true },
  origin_description: { type: String },
  superpowers: [String],
  catch_phrase: { type: String },
  images: [String],
});

module.exports = mongoose.model("Superhero", superheroSchema);