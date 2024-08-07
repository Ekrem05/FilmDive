import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/http/movies";
export default function useGenres() {
  const {
    isPending,
    isError,
    data,
    error,
    refetch: getMovieRecipes,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    enabled: false,
  });
  return { isPending, isError, data, error, getMovieRecipes };
}
