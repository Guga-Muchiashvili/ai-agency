import { fetchModel } from "@/actions/fetch/fetch";
import { useQuery } from "@tanstack/react-query";

export const useGetModel = ({ name }: { name: string }) => {
  return useQuery({
    queryKey: ["model", name],
    queryFn: () => fetchModel({ name }),
  });
};
