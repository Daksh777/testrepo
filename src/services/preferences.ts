import api from "@/lib/api";
import { BACKEND_URL } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const useGetPreferences = (nhood: string) => {
  return useQuery({
    queryKey: ["preferences", nhood],
    queryFn: () => {
      return api
        .get(`${BACKEND_URL}/api/data/neighborhood/${nhood}/`)
        .then((res) => res.data);
    },
    enabled: !!nhood,
  });
};
