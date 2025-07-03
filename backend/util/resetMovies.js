import mongoose from "mongoose";
import Movie from "../models/moviesModel.js";

const start = async () => {
  try {
    await mongoose.connect("");
    console.log("Connected to DB");

    const result = await Movie.updateMany(
      {},
      {
        $set: {
          rejected: false,
          isHandled: false,
          aboutMovie: "",
        },
      }
    );

    console.log(`Updated ${result.modifiedCount} movies`);
    process.exit(0);
  } catch (error) {
    console.error("Error updating movies:", error);
    process.exit(1);
  }
};

start();
