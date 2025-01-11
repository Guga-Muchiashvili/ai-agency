import { useMutation } from "@tanstack/react-query";
import { changeEarningStatus } from "@/api/api";
import { toast } from "sonner";

type ChangeStatusMutationVariables = {
  earningId: string;
  newStatus: string;
};

export const useChangeEarningStatusMutation = (refetchEarnings: () => void) => {
  return useMutation<
    {
      status: string;
      amount: number;
      total: string;
      id: string;
      workerId: string;
      createdAt: string;
      lead: string;
      modelId: string;
      percentage: string;
    },
    Error,
    ChangeStatusMutationVariables
  >({
    mutationFn: changeEarningStatus,
    onSuccess: () => {
      refetchEarnings();
      toast.success("Status updated successfully", {
        description: "The earning status was updated.",
      });
    },
    onError: (error) => {
      alert("Failed to update status");
      throw error;
    },
  });
};
