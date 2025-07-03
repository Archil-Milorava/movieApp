import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <main className="h-screen w-screen overflow-hidden flex items-center justify-center flex-col gap-4 px-2">
      <Link to={"/movies"} className="bg-[#4F7C96] w-full h-[10rem] flex items-center justify-center text-4xl rounded-md hover:opacity-90 transition-all duration-300 font-semibold text-white">
        Movies
      </Link>
      <Link to={"/tvshows"} className="bg-[#d43939] w-full h-[10rem] flex items-center justify-center text-4xl rounded-md hover:opacity-90 transition-all duration-300 font-semibold text-white">
        Tv Shows
      </Link>
    </main>
  );
};

export default MainPage;
