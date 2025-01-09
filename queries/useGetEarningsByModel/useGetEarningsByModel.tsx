import { fetchEarningsByModel } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetEarningsByModel = ({
  filter,
  id,
}: {
  filter: "overall" | "last Month" | "last Week";
  id: string;
}) => {
  return useQuery({
    queryKey: ["earningsByModel", filter],
    queryFn: () => fetchEarningsByModel({ filter, id }),
  });
};
