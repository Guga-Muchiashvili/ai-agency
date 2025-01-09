import { fetchEarningsByModel } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetEarning = ({ id }: { id: string | undefined }) => {
  return useQuery({
    queryKey: ["earningsByModel", id],
    queryFn: () => fetchEarningsByModel({ id }),
  });
};
