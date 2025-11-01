import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReports = (page = 1) => {
  return useQuery({
    queryKey: ["all-reports", page],
    queryFn: () => api.get(`/api/reports/`).then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: true,
    enabled: !!page,
    refetchInterval: 10 * 1000,
  });
};
