import { createTodo } from "@/api/api";
import { IFormTodo } from "@/common/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation<
    IFormTodo & {
      deadline: string;
      description: string;
      label: string;
      createdAt: string;
    },
    Error,
    IFormTodo & {
      deadline: string;
      description: string;
      label: string;
      createdAt: string;
    }
  >({
    mutationFn: createTodo,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todos", variables.type] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      toast.success("Todo added successfully");
    },
    onError: (error: Error) => {
      toast.error("Error adding Todo");
      console.error("Error adding Todo:", error.message);
    },
  });
}
