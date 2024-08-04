import { searchFor } from "@/http/people";
import { useMutation } from "@tanstack/react-query";

export default function useSearchCast() {
  const {
    mutate: searchNow,
    data: searchResult,
    isPending: searching,
    isError,
    error,
  } = useMutation({ mutationFn: searchFor });

  return { searchNow, searchResult, searching, isError, error };
}
