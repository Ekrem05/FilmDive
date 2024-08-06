import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/http/movies";
export default function useGenres() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
  return { isPending, isError, data, error };
}
