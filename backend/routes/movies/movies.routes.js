import express from "express";
import {
  getUnhandledMovies,
  skipMovie,
  updateMovieContent,
} from "./movies.controller.js";

const moviesRoute = express.Router();

//for prod

//for dev
moviesRoute.get("/unhandled", getUnhandledMovies);
moviesRoute.put("/update/:id", updateMovieContent);
moviesRoute.put("/skip/:id", skipMovie);

export default moviesRoute;
