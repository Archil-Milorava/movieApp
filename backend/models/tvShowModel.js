const mongoose = require("mongoose");

const tvShowSchema = new mongoose.Schema({
  adult: Boolean,
  id: Number,
  title: String,
  posterPath: String,
  releaseDate: String,
  raiting: Number,
  isHandled: Boolean,
  rejected: Boolean,
  aboutTvShow: String,
  genres: [String],
});

module.exports = mongoose.model("TvShow", tvShowSchema);
