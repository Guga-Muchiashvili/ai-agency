import { fetchEarningsByModel } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetEarning = ({
  id,
  filter,
}: {
  id: string | undefined;
  filter: "overall" | "last Month" | "last Week";
}) => {
  return useQuery({
    queryKey: ["earningsByModel", id, filter],
    queryFn: () => fetchEarningsByModel({ id, filter }),
  });
};
