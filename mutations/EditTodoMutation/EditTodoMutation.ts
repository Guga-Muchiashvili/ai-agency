import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateTodoType } from "@/api/api";

export default function useUpdateTodoType() {
  const queryClient = useQueryClient();

  return useMutation<
    { id: string; type: string },
    Error,
    { id: string; type: string }
  >({
    mutationFn: ({ id, type }) => updateTodoType(id, type),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      toast.success("Todo type updated successfully");
      return data;
    },
    onError: (error: Error) => {
      toast.error("Error updating Todo type");
      console.error("Error updating Todo type:", error.message);
      return error;
    },
  });
}
