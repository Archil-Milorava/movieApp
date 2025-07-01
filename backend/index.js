import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/connectDB.js";
import moviesRoute from "./routes/movies/movies.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://www.whatwatch.store"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/movies", moviesRoute);
app.use("/", (req,res) => res.send("Hello to movies app backend"))

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on ${PORT}`);
});
