import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "@/shared";
export const useSearchResults = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: ({ signal }) =>
      axios
        .get(`${BACKEND_URL}/api/data/search/?q=${query}`, {
          signal,
        })
        .then((res) => res.data),
    enabled: !!query,
    retry: 3,
    staleTime: Infinity,
  });
};
