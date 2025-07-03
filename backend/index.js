import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/connectDB.js";
import moviesRoute from "./routes/movies/movies.routes.js";
import googleAuthRoute from "./routes/auth/googleAuth.js";
import tvShowsRoute from "./routes/tvShows/tvShows.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://whatwatch.store",
      "https://www.whatwatch.store"  // Add this
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/auth", googleAuthRoute);
app.use("/api/v1/tvshows", tvShowsRoute);
app.use("/api/v1/movies", moviesRoute);
app.use((req, res) => {
  res.status(400).json({
    message: `Bad Request: Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on ${PORT}`);
});
