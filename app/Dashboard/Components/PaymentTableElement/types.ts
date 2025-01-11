export interface ChangeStatusMutationVariables {
  earningId: string;
  newStatus: string;
}

export interface IPaymentTableElementProps {
  name?: string;
  worker?: string;
  status?: string;
  date?: string;
  amount?: number;
  perc?: string;
  id?: string;
  total?: string;
  model?: string | undefined;
  refetchEarnings: () => void;
}
