import { getPeople } from "@/http/people";
import { useQuery } from "@tanstack/react-query";

export default function useGetCast() {
  const { data, isPending, isError, error } = useQuery({
    queryFn: getPeople,
    queryKey: ["get-people"],
  });

  return { data, isPending, isError, error };
}
