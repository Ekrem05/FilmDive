import { getPeople } from "@/http/people";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { browseMovies } from "@/http/movies";
import { browseActions } from "@/store/browse";
import { useDispatch } from "react-redux";
import { browseSeries } from "@/http/series";

export default function useBrowseSeries() {
  const dispatch = useDispatch();
  const { mutate: loadMore, isPending: gettingMovies } = useMutation({
    mutationFn: browseSeries,
    onMutate: () => {
      console.log("get");
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch(browseActions.loadMoreSeries(data));
    },
  });
  const { mutate: getFirstPage, isPending } = useMutation({
    mutationFn: browseSeries,
    onMutate: () => {},
    onSuccess: (data) => {
      console.log(data);
      dispatch(browseActions.getFirstPageSeries(data));
    },
  });

  return { getFirstPage, loadMore, gettingMovies, isPending };
}
