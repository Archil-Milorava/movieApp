import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSmall from "../../components/LoadingSmall";
import { useSkipTvShow } from "./useMoviesHook";
import type { TvShow } from "../../types/tvShowType";

interface TvShowCardProps {
  tvShow: TvShow;
  page: number;
}

const TvShowGridCard = ({ tvShow, page }: TvShowCardProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.role === "admin";
  const [showModal, setShowModal] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { isPending, performSkip, error } = useSkipTvShow(page);

  const handleConfirmSkip = () => {
    performSkip(tvShow._id);
    setShowModal(false);
  };

  if (error) return <ErrorMessage error={error} />;

  if (isPending) return <LoadingSmall />;

  return (
    <>
      <div className="relative w-full h-full max-w-[20rem] rounded-md shadow-md overflow-hidden cursor-pointer border border-[#dadadf]">
        {!isImageLoaded && (
          <div className="absolute inset-0 h-[30rem] w-[15rem] animate-pulse" />
        )}
        <img
          src={tvShow.posterPath}
          alt={tvShow.title}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          } `}
        />

        {isAdmin && (
          <div className="absolute bottom-0 left-0 w-full px-2 py-3 flex justify-center gap-4 z-10">
            <Link
              to={`${tvShow._id}`}
              className="bg-[#30a84c] text-white/90 w-[7rem] h-[2rem] flex items-center justify-center rounded-sm text-xs uppercase font-bold hover:opacity-90 transition"
            >
              edit
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#e4422d] text-white/90 w-[7rem] h-[2rem] rounded-sm flex items-center justify-center text-xs uppercase font-bold hover:opacity-90 transition"
            >
              skip
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6 text-sm text-gray-600">
              This TV show will be skipped and removed from the list.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmSkip}
                className="bg-[#30a84c] text-white px-4 py-2 rounded hover:opacity-90 transition"
              >
                {isPending ? "Skipping..." : "Yes"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#e4422d] text-white px-4 py-2 rounded hover:opacity-90 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TvShowGridCard;
