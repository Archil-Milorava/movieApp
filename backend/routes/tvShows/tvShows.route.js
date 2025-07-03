import express from "express";

import {
  getSingleTvShow,
  getUnhandledTvShows,
  skipTvShow,
  updateTvShowContent,
} from "./tvShows.controller.js";

const tvShowsRoute = express.Router();

//for prod

//for dev
tvShowsRoute.get("/unhandled", getUnhandledTvShows);
tvShowsRoute.get("/:id", getSingleTvShow);
tvShowsRoute.put("/update/:id", updateTvShowContent);
tvShowsRoute.put("/skip/:id", skipTvShow);

export default tvShowsRoute;
