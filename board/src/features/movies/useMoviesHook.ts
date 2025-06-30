import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMoviesToHandle,
  getSingleMovie,
  skipMovie,
  updateMovie,
} from "../../services/movieServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useGetMoviesToHandle = (page: number = 1) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", page],
    queryFn: () => getMoviesToHandle(page),
  });

  const unhandledMovies = data?.unhandledMovies;
  const totalPages = data?.totalPages;
  const unhandledMoviesCount = data?.unhandledMoviesCount;
  const totalMoviesCont = data?.totalMoviesCount;
  const skippedMoviesCount = data?.skippedMoviesCount;

  return {
    unhandledMovies,
    totalPages,
    unhandledMoviesCount,
    skippedMoviesCount,
    totalMoviesCont,
    isLoading,
    error,
  };
};

export const useGetSingleMovie = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getSingleMovie(id),
  });

  const singleMovie = data?.movie;

  return { singleMovie, isLoading, error };
};

export const useUpdateMovie = () => {
  const navigate = useNavigate();
  const {
    mutate: performUpdate,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, description }: { id: string; description: string }) =>
      updateMovie(id, description),
    onSuccess: () => {
      navigate(-1);
      toast.success("updated");
    },
    onError: (err) => {
      toast.error(err.message || "something went wrong");
    },
  });

  return { performUpdate, isPending, error };
};

export const useSkipMovie = (page: number) => {
  const queryClient = useQueryClient();
  const {
    mutate: performSkip,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id: string) => skipMovie(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["movies", page] });
      toast.success("skipped");
    },
    onError: (err) => {
      toast.error(err.message || "something went wrong");
    },
  });

  return { performSkip, isPending, error };
};
