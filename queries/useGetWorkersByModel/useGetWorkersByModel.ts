import { getWorkersByModel } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkersByModel = (modelId: string | undefined) => {
  return useQuery({
    queryKey: ["workersByModel"],
    queryFn: () => getWorkersByModel(modelId),
  });
};
