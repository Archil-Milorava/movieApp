import mongoose from "mongoose";

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

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
