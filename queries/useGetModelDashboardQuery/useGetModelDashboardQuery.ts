import { fetchModelDashboardData } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetModelDashboard = ({
  name,
  filter,
}: {
  name: string | undefined;
  filter: "overall" | "last Month" | "last Week";
}) => {
  return useQuery({
    queryKey: ["modeldashboard", name, filter],
    queryFn: () => fetchModelDashboardData({ modelName: name, filter }),
  });
};
