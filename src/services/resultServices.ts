/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { BACKEND_URL } from "@/shared";
import api from "@/lib/api";

export const useRankingResults = () => {
  const baseUrl = `${BACKEND_URL}/api/data/ranked_search/`;
  return useMutation({
    mutationFn: async (data) => {
      return api.post(baseUrl, data).then((res) => res.data);
    },
  });
};
