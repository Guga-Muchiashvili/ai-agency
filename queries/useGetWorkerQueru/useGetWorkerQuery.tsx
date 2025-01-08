import { fetchWorkersById } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkerById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["worker", id],
    queryFn: () => fetchWorkersById({ id }),
  });
};
