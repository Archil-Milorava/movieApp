import mongoose from "mongoose";

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

const TvShow = mongoose.model("TvShow", tvShowSchema);

export default TvShow;
