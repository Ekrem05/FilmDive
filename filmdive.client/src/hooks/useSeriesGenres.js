import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/http/movies";
import { seriesGenres } from "@/http/series";
export default function useSeriesGenres() {
  const {
    isPending,
    isError,
    data,
    error,
    refetch: getSeriesGenres,
  } = useQuery({
    queryKey: ["seriesGenres"],
    queryFn: seriesGenres,
    enabled: false,
  });
  return { isPending, isError, data, error, getSeriesGenres };
}
