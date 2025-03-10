import { fetchTodos } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
  });
};
