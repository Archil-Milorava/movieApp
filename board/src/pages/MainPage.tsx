import { Link, useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import LoadingLarge from "../components/LoadingLarge";
import MovieGridCard from "../features/movies/MovieGridCard";
import { useGetMoviesToHandle } from "../features/movies/useMoviesHook";

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { isLoading, error, unhandledMovies, totalPages, itemsCount } =
    useGetMoviesToHandle(page);

  const handlePagination = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (isLoading) return <LoadingLarge />;

  return (
    <div className="w-full min-h-screen bg-[#EDE9E6]">
      <Link
        to={"/"}
        className="w-full h-9 flex items-center justify-center font-semibold shadow-sm uppercase text-sm"
      >
        {itemsCount} left to handle
      </Link>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-4 p-4 justify-items-center  py-10">
            {unhandledMovies?.map((movie) => (
              <MovieGridCard key={movie._id} movie={movie} page={page} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4 pb-11">
            <button
              onClick={() => handlePagination(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {page}</span>
            <button
              onClick={() => handlePagination(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
