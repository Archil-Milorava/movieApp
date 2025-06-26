import express from "express";
import { getUnhandledMovies, updateMovieContent } from "./movies.controller.js";

const moviesRoute = express.Router();

//for prod



//for dev
moviesRoute.get("/unhandled", getUnhandledMovies);
moviesRoute.put("/update/:id", updateMovieContent);

export default moviesRoute;
