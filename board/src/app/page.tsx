import MovieCard from "@/components/MovieCard";
import { getMoviesToHandle } from "@/services/movieServices";
import Link from "next/link";

interface PageProps {
  searchParams?: { page?: string };
}

const Page = async ({ searchParams }: PageProps) => {
  const currentPage = parseInt(searchParams?.page || "1", 10);

  const moviesData = await getMoviesToHandle(currentPage);

  const { itemsCount, totalPages, unhandledMovies } = moviesData;

  return (
    <>
      <Link href={"/"} className="h-10 flex items-center justify-start pl-11">
        <h1 className="text-sm uppercase flex items-center justify-center">
          {itemsCount} movies left to handle{" "}
        </h1>
      </Link>
      {/* grid */}
      <div className="m-0 py-8 w-full min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-4 px-4">
        {unhandledMovies?.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center gap-4 pb-8">
        <Link
          href={`/?page=${Math.max(1, currentPage - 1)}`}
          className={`px-4 py-2 border rounded ${
            currentPage === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Previous
        </Link>

        <span className="flex items-center px-4 py-2 border rounded">
          Page {currentPage} of {totalPages}
        </span>

        <Link
          href={`/?page=${Math.min(totalPages, currentPage + 1)}`}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </>
  );
};

export default Page;
