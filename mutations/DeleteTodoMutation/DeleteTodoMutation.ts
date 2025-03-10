import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTodo } from "@/api/api";

export default function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; message: string }, Error, string>({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully");
      return data;
    },
    onError: (error: Error) => {
      toast.error("Error deleting Todo");
      console.error("Error deleting Todo:", error.message);
      return error;
    },
  });
}
