import Image from "next/image";
import pen from "../public/pencil.png";
import skip from "../public/skip.png";
import { Movie } from "../types/movieTypes";

interface Props {
  movie: Movie;
}



const MovieCard = ({ movie }: Props) => {
  return (
    <div className=" h-96 w-64 border border-amber-500 rounded-sm shadow-md overflow-hidden">
      <div className=" h-[80%] w-full overflow-hidden">
        <img src={movie.posterPath} className="w-full h-full object-cover" alt="image" />
      </div>
      <div className=" h-[20%] w-full">
        <h1 className="h-1/2 w-full overflow-hidden  flex items-center justify-center text-sm p-1 tracking-wide">
          {movie.title}
        </h1>
        <div className=" h-1/2 w-full overflow-hidden flex items-center px-2 pb-1 gap-2">
          <button className="w-full h-9 bg-[#b40505] rounded-sm flex items-center justify-center gap-2 hover:opacity-80 cursor-pointer transition-all duration-200 uppercase tracking-wider text-sm font-semibold">
            skip <Image src={skip} alt="skip" className="h-5 w-5" />
          </button>
          <button className="w-full h-9 bg-[#0ba005] rounded-sm flex items-center justify-center gap-2 hover:opacity-80 cursor-pointer transition-all duration-200 uppercase tracking-wider text-sm font-semibold">
            Edit <Image src={pen} alt="pencil" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
