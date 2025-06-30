import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getMoviesToHandle,
  skipMovie,
  updateMovie,
} from "../../services/movieServices";

export const useGetMoviesToHandle = (page: number = 1) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", page],
    queryFn: () => getMoviesToHandle(page),
  });

  const unhandledMovies = data?.unhandledMovies;
  const totalPages = data?.totalPages
  const itemsCount = data?.itemsCount

  return { unhandledMovies, totalPages, itemsCount, isLoading, error };
};

export const useUpdateMovie = () => {
  const { data, isPending, error } = useMutation({
    mutationFn: (id: number) => updateMovie(id),
    onSuccess: () => {
      console.log("success");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { data, isPending, error };
};

export const useSkipMovie = () => {
  const { data, isPending, error } = useMutation({
    mutationFn: (id: number) => skipMovie(id),
    onSuccess: () => {
      console.log("success");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { data, isPending, error };
};
