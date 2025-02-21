import { fetchLeadById } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkersByModel = (leadId: string | undefined) => {
  return useQuery({
    queryKey: ["leadById"],
    queryFn: () => fetchLeadById({ id: leadId }),
  });
};
