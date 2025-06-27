import Image from "next/image";
import helmetIcon from "../../../public/helmet.png";

const EditPage = async () => {
  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-32 lg:px-60 bg-white text-black">
      {/* Title */}
      <h1 className="text-xl font-semibold mb-4">Edit Movie Description</h1>

      {/* Poster + Form */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Poster Image */}
        <div className="w-full md:w-1/2 overflow-hidden rounded-md shadow">
          <img
            src="https://image.tmdb.org/t/p/w500/ygGmAO60t8GyqUo9xYeYxSZAR3b.jpg"
            alt="poster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form */}
        <form className="w-full md:w-1/2 flex flex-col gap-4">
          <textarea
            id="description"
            name="description"
            className="h-52 resize-none border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your thoughts about the movie..."
          ></textarea>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-3 rounded-md font-semibold uppercase tracking-wider transition-all"
          >
            <span>Submit</span>
            <Image src={helmetIcon} alt="icon" width={24} height={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
