import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createLead } from "@/api/api";
import { IFormLead } from "@/common/types/types";

export default function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation<IFormLead, Error, IFormLead>({
    mutationFn: createLead,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Leads Created");
      return data;
    },
    onError: (error: Error) => {
      toast.error("Error creating worker");
      console.error("Error adding worker:", error.message);
      return error;
    },
  });
}
