'use client'
import {
  getMoviesToHandle,
  skipMovie,
  updateMovieContent,
} from "@/services/movieServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetMoviesToHandle = (page: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["movies", page],
    queryFn: () => getMoviesToHandle(page),
  });

  const unhandledMovies = data?.unhandledMovies;
  const currentPage = data?.page;
  const itemsCount = data?.itemsCount;
  const totalPages = data?.totalPages;

  return { unhandledMovies, currentPage, itemsCount, totalPages, ...rest };
};

export const useUpdateMovieContent = () => {
  const { mutate: updateContent, ...rest } = useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      updateMovieContent(id, content),
    onSuccess: () => {
      toast.success("content added");
    },
    onError: (err) => {
      toast.error(err.message || "could not add");
    },
  });

  return { updateContent, ...rest };
};

export const useSkipMovie = () => {
  const { mutate: handleSkipMovie, ...rest } = useMutation({
    mutationFn: (id: number) => skipMovie(id),
    onSuccess: () => {
      toast.success("movie skipped");
    },
    onError: (err) => {
      toast.error(err.message || "could not skip");
    },
  });

  return { handleSkipMovie, ...rest };
};
