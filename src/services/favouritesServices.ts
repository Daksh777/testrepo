import api from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useIsFavouriteCheck = (neighbour_id: string | number) => {
  return useQuery({
    queryKey: ["isFavourite", neighbour_id],
    queryFn: () => api.get(`/api/favorites/${neighbour_id}/`),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    enabled: !!neighbour_id,
    retry: false,
  });
};

export const useAddFavourite = () => {
  return useMutation({
    mutationFn: (body: any) => api.post("/api/favorites/", body),
  });
};

export const useRemoveFavourite = (neighbour_id: string | number) => {
  return useMutation({
    mutationFn: (data: any) =>
      api.delete(`/api/favorites/${neighbour_id}/`, data),
  });
};

export const useGetAllFavourites = (page: number) => {
  return useQuery({
    queryKey: ["favourites", page],
    queryFn: () =>
      api.get(`/api/favorites/?page=${page}`).then((res) => res.data),
  });
};
