import { fetchModelDashboardData } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetModelDashboard = ({
  name,
}: {
  name: string | undefined;
}) => {
  return useQuery({
    queryKey: ["modeldashboard", name],
    queryFn: () => fetchModelDashboardData({ name }),
  });
};
