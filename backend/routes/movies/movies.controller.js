import Movie from "../../models/moviesModel.js";

export const getUnhandledMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const itemsCount = await Movie.countDocuments({ isHandled: false });

    const unhandledMovies = await Movie.find({
      isHandled: false,
      rejected: false,
    })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      page,
      totalPages: Math.ceil(itemsCount / limit),
      itemsCount,
      unhandledMovies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch unhandled movies." });
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
