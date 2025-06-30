import type { Movie } from "../../types/moviesType";

interface MovieCardProps {
  movie: Movie;
}

const MovieGridCard = ({ movie }: MovieCardProps) => {
  return (
      <div className="relative w-full h-full max-w-[20rem] rounded-md shadow-md overflow-hidden cursor-pointer">
      {/* Image with dark overlay effect */}
      <img
        src={movie.posterPath}
        alt={movie.title}
        className="object-cover w-full h-full "
      />

      {/* Button container at the bottom */}
      <div className="absolute bottom-0 left-0 w-full  px-2 py-3 flex justify-center gap-4 z-10">
        <button className="bg-green-700 text-white/90 w-[7rem] h-[2rem] rounded-sm text-xs uppercase font-semibold hover:opacity-90 transition">
          edit
        </button>
        <button className="bg-red-700 text-white/90 w-[7rem] h-[2rem] rounded-sm text-xs uppercase font-semibold hover:opacity-90 transition">
          skip
        </button>
      </div>
    </div>
  );
};

export default MovieGridCard;
