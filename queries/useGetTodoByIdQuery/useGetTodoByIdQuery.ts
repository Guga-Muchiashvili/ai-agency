import { fetchTodoById } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetTodoById = ({ id }: { id: string | undefined }) => {
  return useQuery({
    queryKey: id ? ["Todo", id] : [],
    queryFn: () => fetchTodoById({ id }),
    enabled: !!id,
  });
};
