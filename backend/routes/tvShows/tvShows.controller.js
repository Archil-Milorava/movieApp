import TvShow from "../../models/tvShowModel.js";

export const getUnhandledTvShows = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const unhandledTvShowsCount = await TvShow.countDocuments({
      isHandled: false,
      rejected: false,
    });
    const totalTvShowsCount = await TvShow.countDocuments();
    const skippedTvShowsCount = await TvShow.countDocuments({ rejected: true });

    const unhandledTvShows = await TvShow.find({
      isHandled: false,
      rejected: false,
    })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      page,
      totalPages: Math.ceil(unhandledTvShowsCount / limit),
      unhandledTvShowsCount,
      totalTvShowsCount,
      skippedTvShowsCount,
      unhandledTvShows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch unhandled TV shows." });
  }
};

export const getSingleTvShow = async (req, res) => {
  const { id } = req.params;
  try {
    const tvShow = await TvShow.findById(id);

    if (!tvShow) {
      return res.status(400).json({
        message: "TV show not found",
      });
    }

    return res.status(200).json({
      tvShow,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch single TV show." });
  }
};

export const updateTvShowContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutMovie } = req.body;

    const updatedTvShow = await TvShow.findByIdAndUpdate(
      id,
      {
        aboutMovie,
        isHandled: true,
      },
      { new: true }
    );

    if (!updatedTvShow) {
      return res.status(404).json({ message: "TV show not found." });
    }

    res.status(200).json({
      message: "TV show content updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update TV show content." });
  }
};

export const skipTvShow = async (req, res) => {
  try {
    const { id } = req.params;

    const handleReject = await TvShow.findByIdAndUpdate(
      id,
      {
        rejected: true,
      },
      {
        new: true,
      }
    );

    if (!handleReject) {
      return res.status(404).json({ message: "TV show not found." });
    }

    res.status(200).json({
      message: "TV show skipped.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to skip TV show." });
  }
};
