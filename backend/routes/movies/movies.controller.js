import Movie from "../../models/moviesModel.js";

export const getUnhandledMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const unhandledMoviesCount = await Movie.countDocuments({
      isHandled: false,
      rejected: false,
    });
    const totalMoviesCount = await Movie.countDocuments();

    const skippedMoviesCount = await Movie.countDocuments({ rejected: true });

    const unhandledMovies = await Movie.find({
      isHandled: false,
      rejected: false,
    })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      page,
      totalPages: Math.ceil(unhandledMoviesCount / limit),
      unhandledMoviesCount,
      totalMoviesCount,
      unhandledMovies,
      skippedMoviesCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch unhandled movies." });
  }
};

export const getSingleMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(400).json({
        message: "movie not found",
      });
    }

    return res.status(200).json({
      movie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch single movie." });
  }
};

export const updateMovieContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutMovie } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        aboutMovie,
        isHandled: true,
      },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    res.status(200).json({
      message: "Movie content updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update movie content." });
  }
};

export const skipMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const handleReject = await Movie.findByIdAndUpdate(
      id,
      {
        rejected: true,
      },
      {
        new: true,
      }
    );

    if (!handleReject) {
      return res.status(404).json({ message: "Movie not found." });
    }

    res.status(200).json({
      message: "Movie skipped.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to skip content." });
  }
};
