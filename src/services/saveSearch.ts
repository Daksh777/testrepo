/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import {
  CreateSavedSearchPayload,
  RenamePayload,
  SavedSearch,
  SavedSearchListRes,
} from "@/types/saveSearchTypes";
import { AxiosError } from "axios";

const SAVED_SEARCHES_KEY = ["saved-searches"];

export const useSavedSearches = () => {
  return useQuery<SavedSearchListRes>({
    queryKey: SAVED_SEARCHES_KEY,
    queryFn: async () => {
      const res = await api.get("/api/saved_searches/");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateSavedSearch = (): UseMutationResult<
  SavedSearch,
  AxiosError,
  CreateSavedSearchPayload
> => {
  const queryClient = useQueryClient();

  return useMutation<SavedSearch, AxiosError, CreateSavedSearchPayload>({
    mutationFn: async (data) => {
      const res = await api.post("/api/saved_searches/", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Saved search created successfully.");
      queryClient.invalidateQueries({ queryKey: [...SAVED_SEARCHES_KEY] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.name?.[0] || "Failed to create saved search."
      );
    },
  });
};

export const useSavedSearchById = (id: string) => {
  return useQuery<SavedSearch>({
    queryKey: [...SAVED_SEARCHES_KEY, id],
    queryFn: async () => {
      const res = await api.get(`/api/saved_searches/${id}/`);
      return res.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRenameSavedSearch = (): UseMutationResult<
  SavedSearch,
  AxiosError,
  RenamePayload
> => {
  const queryClient = useQueryClient();

  return useMutation<SavedSearch, AxiosError, RenamePayload>({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/api/saved_searches/${id}/`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Saved search renamed successfully.");
      queryClient.invalidateQueries({ queryKey: [...SAVED_SEARCHES_KEY] });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.detail || "Failed to rename saved search."
      );
    },
  });
};

export const useDeleteSavedSearch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/saved_searches/${id}/`);
    },
    onSuccess: () => {
      toast.success("Saved search deleted successfully.");
      queryClient.invalidateQueries({ queryKey: [...SAVED_SEARCHES_KEY] });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.detail || "Failed to delete saved search."
      );
    },
  });
};
