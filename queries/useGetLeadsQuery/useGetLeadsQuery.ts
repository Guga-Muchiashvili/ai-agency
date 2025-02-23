import { fetchLeads } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetLeads = (searchParams: {
  workerName: string;
  modelName: string;
  leadName: string;
}) => {
  return useQuery({
    queryKey: ["leads", searchParams],
    queryFn: () => fetchLeads(searchParams),
  });
};
