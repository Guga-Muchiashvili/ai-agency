import { addNoteToLead } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Custom hook for creating a note
export default function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    Error,
    { leadId: string; noteContent: string }
  >({
    mutationFn: addNoteToLead,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lead", variables.leadId] });

      toast.success("Note added successfully");
    },
    onError: (error: Error) => {
      toast.error("Error adding note");
      console.error("Error adding note:", error.message);
    },
  });
}
