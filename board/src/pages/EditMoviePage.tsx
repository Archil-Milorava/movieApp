import { useState } from "react";
import {
  useGetSingleMovie,
  useUpdateMovie,
} from "../features/movies/useMoviesHook";
import { useParams } from "react-router-dom";
import LoadingLarge from "../components/LoadingLarge";
import ErrorMessage from "../components/ErrorMessage";

const EditMoviePage = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");

  const { singleMovie, isLoading, error } = useGetSingleMovie(id!);
  const { performUpdate, isPending, error: submitError } = useUpdateMovie();

  if (isLoading) {
    return <LoadingLarge />;
  }

  if (error || submitError) {
    return <ErrorMessage error={error} />;
  }

  const handleSubmit = () => {
    if (!id) return;
    performUpdate({ id, description });
    setShowModal(false);
  };

  if (isPending) return <LoadingLarge />;

  return (
    <div
      className={`bg-[#EDE9E6] min-h-screen flex items-center justify-center p-4`}
    >
      <div className="w-full max-w-3xl bg-white p-6 rounded-md shadow-md">
        {/* Poster Image */}
        <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
          <img
            src={singleMovie?.posterPath}
            alt={singleMovie?.title}
            className="w-40 h-60 object-cover rounded-md shadow"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Edit movie description..."
            className="w-full min-h-[150px] p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#30a84c]"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#30a84c] text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Are you sure? Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6 text-sm text-gray-600">
              You are about to submit changes to this movie.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="bg-[#30a84c] text-white px-4 py-2 rounded hover:opacity-90 transition"
              >
                {isPending ? "Submitting.." : "yes"}
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
    </div>
  );
};

export default EditMoviePage;
