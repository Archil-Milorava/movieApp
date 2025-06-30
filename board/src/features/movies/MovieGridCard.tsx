import { useState } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../../types/moviesType";
import { useSkipMovie } from "./useMoviesHook";
import ErrorMessage from "../../components/ErrorMessage";

interface MovieCardProps {
  movie: Movie;
  page: number;
}

const MovieGridCard = ({ movie, page }: MovieCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const { isPending, performSkip, error } = useSkipMovie(page);

  const handleConfirmSkip = () => {
    performSkip(movie._id);
    setShowModal(false);
  };

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <div className="relative w-full h-full max-w-[20rem] rounded-md shadow-md overflow-hidden cursor-pointer border border-[#dadadf]">
        <img
          src={movie.posterPath}
          alt={movie.title}
          className="object-cover w-full h-full"
        />

        <div className="absolute bottom-0 left-0 w-full px-2 py-3 flex justify-center gap-4 z-10">
          <Link
            to={`${movie._id}`}
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
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6 text-sm text-gray-600">
              This movie will be skipped and removed from the list.
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

export default MovieGridCard;
