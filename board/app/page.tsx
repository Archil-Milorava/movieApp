import movieIcon from "../public/movie.png";
import MovieCard from "../components/MovieCard";
import { MovieResponse } from "../types/movieTypes";
import Image from "next/image";
import Link from "next/link";

const movieAPI = (page: number) =>
  `http://localhost:8000/api/v1/movies/unhandled?page=${page}`;

async function getMovies(page: number): Promise<MovieResponse> {
  const res = await fetch(movieAPI(page), { cache: "no-store" });
  const data = await res.json();
  return data;
}

interface PageProps {
  searchParams?: { page?: string };
}

const Page = async ({ searchParams }: PageProps) => {
  const currentPage = parseInt(searchParams?.page || "1", 10);
  const { itemsCount, page, totalPages, unhandledMovies } = await getMovies(
    currentPage
  );

  return (
    <>

        {/* header */}
      <Link href={"/"} className="h-10 flex items-center justify-start pl-11">
        <h1 className="text-sm uppercase flex items-center justify-center">
          {itemsCount} movies left to handle{" "}
          <Image src={movieIcon} width={30} height={30} alt="movieIcon" />
        </h1>
      </Link>


      {/* grid */}
      <div className="m-0 py-8 w-full min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-4 px-4">
        {unhandledMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
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
