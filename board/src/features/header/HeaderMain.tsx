import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

interface HeaderMainProps {
  unhandledMoviesCount?: number;
  skippedMoviesCount?: number;
  totalMoviesCont?: number;
}

const HeaderMain = ({
  unhandledMoviesCount,
  skippedMoviesCount,
  totalMoviesCont,
}: HeaderMainProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.role === "admin";
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isShowsPage = location.pathname === "/shows";

  return (
    <div className="w-full px-4 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 shadow-md border-b bg-white">
      <Link
        to={"/"}
        className="flex flex-col sm:flex-row sm:items-center gap-4 flex-grow"
      >
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-3">
            <img
              src={user.picture}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
            <h1 className="text-lg font-bold uppercase text-gray-800">
              Welcome, {user?.name || "User"}
            </h1>
          </div>
          <p className="text-xs text-green-500 mt-1">
            {isAdmin ? "Admin" : "Viewer Access"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center mt-4 sm:mt-0">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
            {unhandledMoviesCount ?? 0} to handle
          </span>
          <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
            {skippedMoviesCount ?? 0} skipped
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
            {totalMoviesCont ?? 0} total
          </span>
        </div>
      </Link>

      <Link
        to={isShowsPage ? "/" : "/shows"}
        className="text-sm text-blue-600 hover:underline"
      >
        {isShowsPage ? "Switch to Movies" : "Switch to TV Shows"}
      </Link>

      <button
        onClick={handleLogout}
        title="Logout"
        className="flex items-center justify-center text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-100"
        aria-label="Logout"
      >
        <MdLogout size={24} />
      </button>
    </div>
  );
};

export default HeaderMain;
