import API from "../config/axiosConfig";
import type { Movie, MovieRespone } from "../types/moviesType";

export const getMoviesToHandle = (page: number): Promise<MovieRespone> =>
  API.get(`/movies/unhandled`, { params: { page } });

export const getSingleMovie = (id: string): Promise<{ movie: Movie }> =>
  API.get(`/movies/${id}`);

export const updateMovie = (id: string, aboutMovie: string) =>
  API.put(`/movies/update/${id}`, {aboutMovie});

export const skipMovie = (id: string) => API.put(`/movies/skip/${id}`);
