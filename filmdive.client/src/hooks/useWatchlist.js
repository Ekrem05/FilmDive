import { useMutation } from "@tanstack/react-query";
import { addToWatchlist } from "@/http/user";

export default function useWatchlist() {
  const { mutate: add } = useMutation({
    mutationFn: addToWatchlist,
    onMutate: () => {},
    onError: (err) => {
      console.log("err", err);
    },
    onSuccess: (data) => {
      console.log("succ");
    },
  });

  return { add };
}
