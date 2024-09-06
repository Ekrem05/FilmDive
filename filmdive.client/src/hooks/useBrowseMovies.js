import { getPeople } from "@/http/people";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { browseMovies } from "@/http/movies";
import { browseActions } from "@/store/browse";
import { useDispatch } from "react-redux";

export default function useBrowseMovies() {
  const dispatch = useDispatch();
  const { mutate: loadMore, isPending: gettingMovies } = useMutation({
    mutationFn: browseMovies,
    onMutate: () => {},
    onSuccess: (data) => {
      dispatch(browseActions.loadMoreMovies(data));
    },
  });
  const { mutate: getFirstPage, isPending } = useMutation({
    mutationFn: browseMovies,
    onMutate: () => {},
    onSuccess: (data) => {
      dispatch(browseActions.getFirstPageMovies(data));
    },
  });

  return { getFirstPage, loadMore, gettingMovies, isPending };
}
