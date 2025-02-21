import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteLead } from "@/api/api";

export default function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; message: string }, Error, string>({
    mutationFn: deleteLead,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead deleted successfully");
      return data;
    },
    onError: (error: Error) => {
      toast.error("Error deleting lead");
      console.error("Error deleting lead:", error.message);
      return error;
    },
  });
}
