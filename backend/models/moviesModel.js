const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  adult: Boolean,
  id: Number, 
  title: String,
  posterPath: String,
  releaseDate: String,
  raiting: Number,
  isHandled: Boolean,
  rejected: Boolean,
  aboutMovie: String,
  genres: [String],
});

module.exports = mongoose.model("Movie", movieSchema);
