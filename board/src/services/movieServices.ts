import API from "@/config/axiosConfig";
import { MovieResponse } from "@/types/movieTypes";

export const getMoviesToHandle = async (page: number): Promise<MovieResponse> =>
  API.get(`movies/unhandled`, { params: { page } });

export const updateMovieContent = async (id: number, content: string) =>
  API.put(`movies/update/${id}`, { aboutMovie: content });

export const skipMovie = async (id: number) => API.put(`movies/skip/${id}`);
