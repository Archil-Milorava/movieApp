import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getSingleTvShow,
  getTvShowsToHandle,
  skipTvShow,
  updateTvShow,
} from "../../services/tvshowServices";

export const useGetTvShowsToHandle = (page: number = 1) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tvshows", page],
    queryFn: () => getTvShowsToHandle(page),
  });

  const unhandledTvShows = data?.unhandledTvShows;
  const totalPages = data?.totalPages;
  const unhandledTvShowsCount = data?.unhandledTvShowsCount;
  const totalTvShowsCount = data?.totalTvShowsCount;
  const skippedTvShowsCount = data?.skippedTvShowsCount;

  return {
    unhandledTvShows,
    totalPages,
    unhandledTvShowsCount,
    skippedTvShowsCount,
    totalTvShowsCount,
    isLoading,
    error,
  };
};

export const useGetSingleTvShow = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tvshow", id],
    queryFn: () => getSingleTvShow(id),
  });

  const singleTvShow = data?.tvShow;

  return { singleTvShow, isLoading, error };
};

export const useUpdateTvShow = () => {
  const navigate = useNavigate();
  const {
    mutate: performUpdate,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ id, description }: { id: string; description: string }) =>
      updateTvShow(id, description),
    onSuccess: () => {
      navigate(-1);
      toast.success("TV Show updated");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  return { performUpdate, isPending, error };
};

export const useSkipTvShow = (page: number) => {
  const queryClient = useQueryClient();
  const {
    mutate: performSkip,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id: string) => skipTvShow(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tvshows", page] });
      toast.success("TV Show skipped");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  return { performSkip, isPending, error };
};
