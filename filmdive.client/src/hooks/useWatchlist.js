import { useMutation, useQuery } from "@tanstack/react-query";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "@/http/user";
import { useDispatch } from "react-redux";
import { watchlistActions } from "@/store/watchlist";

export default function useWatchlist() {
  const dispatch=useDispatch();
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
  const { mutate:get } = useMutation({
    mutationFn:getWatchlist,
    onError: (err) => {},
    onSuccess: (data) => {
      console.log(data)
      dispatch(watchlistActions.setWatchlist({
        series:data.series,
        movies:data.movies
      }))
    },
    enabled:false
  });

  return { add, remove,get };
}
