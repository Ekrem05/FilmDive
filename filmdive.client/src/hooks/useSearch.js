import { getPeople } from "@/http/people";
import { search } from "@/http/search";
import { movieActions } from "@/store/movie";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export default function useSearch() {
  const dispatch = useDispatch();
  const {
    mutate,
    data: result,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: search,
  });

  return { mutate, result, isPending, isError, error };
}
