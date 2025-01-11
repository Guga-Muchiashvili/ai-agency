export interface FormElementProps {
  name: string;
  label: string;
}

export interface IChartData {
  label: string;
  data: number[] | undefined;
  borderColor: string;
  backgroundColor: string;
}

export interface IWorker {
  amount: number;
  modelId: string;
  workerId: string;
  createdAt: string;
  status: string;
  percentage: string;
  total: string;
  lead: string;
}
