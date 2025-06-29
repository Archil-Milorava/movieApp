import { MovieResponse } from "@/types/movieTypes";

const BASE_URL = process.env.NEXT_PUBLIC_DATA_BASE_URL;

export const getMoviesToHandle = async (
  page: number = 1
): Promise<MovieResponse> => {
  const response = await fetch(`${BASE_URL}/movies/unhandled?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();

  return data;
};

export const updateMovieContent = async (
  id: number,
  content: string
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/movies/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ aboutMovie: content }),
  });

  if (!response.ok) {
    throw new Error("Failed to update movie content");
  }
};

export const skipMovie = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/movies/skip/${id}`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to skip movie");
  }
};
