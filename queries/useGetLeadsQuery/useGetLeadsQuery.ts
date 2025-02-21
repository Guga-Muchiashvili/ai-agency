import { fetchLeads } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetLeads = () => {
  return useQuery({
    queryKey: ["leads"],
    queryFn: () => fetchLeads(),
  });
};
