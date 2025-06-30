export type Movie = {
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

export interface MovieRespone {
  page: number;
  totalPages: number;
  totalMoviesCount: number;
  unhandledMoviesCount: number;
  skippedMoviesCount: number;
  unhandledMovies: Movie[];
}
