import API from "../config/axiosConfig";
import type { MovieRespone } from "../types/moviesType";

export const getMoviesToHandle = (page: number): Promise<MovieRespone> =>
  API.get(`/movies/unhandled`, { params: { page } });

export const updateMovie = (id: number) => API.put(`/movies/update/${id}`);

export const skipMovie = (id: number) => API.put(`/movies/skip/${id}`);
