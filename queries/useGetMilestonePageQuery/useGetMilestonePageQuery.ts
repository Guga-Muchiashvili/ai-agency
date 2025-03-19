import { getCurrentMilestoneData } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetMilestoneData = () => {
  return useQuery({
    queryKey: ["milestoneData"],
    queryFn: () => getCurrentMilestoneData(),
  });
};
