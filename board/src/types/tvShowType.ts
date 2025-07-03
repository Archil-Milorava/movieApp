export type TvShow = {
  _id: string;
  adult: boolean;
  id: number;
  title: string;
  posterPath: string;
  releaseDate: Date | string;
  raiting: number;
  isHandled: boolean;
  rejected: boolean;
  aboutMovie?: string;
  genres: string[];
};

export interface TvShowResponse {
  page: number;
  totalPages: number;
  totalTvShowsCount: number;
  unhandledTvShowsCount: number;
  skippedTvShowsCount: number;
  unhandledTvShows: TvShow[];
}
