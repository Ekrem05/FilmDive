import { useMutation } from "@tanstack/react-query";
import { addToWatchlist, removeFromWatchlist } from "@/http/user";

export default function useWatchlist() {
  const { mutate: add } = useMutation({
    mutationFn: addToWatchlist,
    onMutate: () => {},
    onError: (err) => {},
    onSuccess: (data) => {},
  });
  const { mutate: remove } = useMutation({
    mutationFn: removeFromWatchlist,
    onMutate: () => {},
    onError: (err) => {},
    onSuccess: (data) => {},
  });

  return { add, remove };
}
