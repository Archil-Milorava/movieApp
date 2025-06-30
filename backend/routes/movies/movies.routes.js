import express from "express";
import {
  getSingleMovie,
  getUnhandledMovies,
  skipMovie,
  updateMovieContent,
} from "./movies.controller.js";

const moviesRoute = express.Router();

//for prod

//for dev
moviesRoute.get("/unhandled", getUnhandledMovies);
moviesRoute.get("/:id", getSingleMovie);
moviesRoute.put("/update/:id", updateMovieContent);
moviesRoute.put("/skip/:id", skipMovie);

export default moviesRoute;
