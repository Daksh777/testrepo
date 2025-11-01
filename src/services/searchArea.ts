import { useQuery } from "@tanstack/react-query";
import { GeographicFilters } from "@/types/searchAreaTypes";
import api from "@/lib/api";
import { BACKEND_URL } from "@/shared";

const fetchGeographicFilters = async (): Promise<GeographicFilters> => {
  return api
    .get(`${BACKEND_URL}/api/data/geographic_filters/`)
    .then((res) => res.data);
};

export const useSearchAreaResults = () => {
  return useQuery<GeographicFilters>({
    queryKey: ["search-area"],
    queryFn: fetchGeographicFilters,
    retry: 0,
  });
};
