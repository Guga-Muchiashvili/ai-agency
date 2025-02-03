import { getAllModelsWithWorkers } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkersLeaderboard = () => {
  return useQuery({
    queryKey: ["workersLeaderboard"],
    queryFn: () => getAllModelsWithWorkers(),
  });
};
