import API from "../config/axiosConfig";
import type { Movie,  } from "../types/moviesType";
import type { TvShowResponse } from "../types/tvShowType";

export const getTvShowsToHandle = (page: number): Promise<TvShowResponse> =>
  API.get(`/tvshows/unhandled`, { params: { page } });

export const getSingleTvShow = (id: string): Promise<{ tvShow: Movie }> =>
  API.get(`/tvshows/${id}`);

export const updateTvShow = (id: string, aboutMovie: string) =>
  API.put(`/tvshows/update/${id}`, { aboutMovie });

export const skipTvShow = (id: string) => API.put(`/tvshows/skip/${id}`);
