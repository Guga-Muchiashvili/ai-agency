import { fetchModels } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetModels = () => {
  return useQuery({
    queryKey: ["models"],
    queryFn: () => fetchModels(),
  });
};
