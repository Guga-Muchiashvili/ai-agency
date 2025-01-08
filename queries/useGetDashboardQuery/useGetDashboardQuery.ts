import { fetchDashboardPageInfo } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardData = ({
  filter,
}: {
  filter: "overall" | "last Month" | "last Week";
}) => {
  return useQuery({
    queryKey: ["dashboard", filter],
    queryFn: () => fetchDashboardPageInfo({ filter }),
  });
};
