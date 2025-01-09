import { fetchEarningsByModelGroup } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetChartEarningData = ({
  filter,
}: {
  filter: "overall" | "last Month" | "last Week";
}) => {
  return useQuery({
    queryKey: ["earningsByfilter", filter],
    queryFn: () => fetchEarningsByModelGroup({ filter }),
  });
};
