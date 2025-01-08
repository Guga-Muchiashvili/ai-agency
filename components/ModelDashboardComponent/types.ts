export interface IModelDashboardProps {
  data: {
    description: string;
    name: string;
    age: string;
    country: string;
    drive: string;
    telegram: string;
    date: string;
    image: string;
    id: string;
    email: string;
    password: string;
  } | null;
  workers: {
    id: string;
    name: string;
    modelId: string;
    earnings: string[];
    profit: string;
  }[];
  earningData: {
    id: string;
    modelId: string;
    amount: number;
    createdAt: string;
    lead: string;
    percentage: string;
    status: string;
    total: string;
    workerId: string;
  }[];
}

export interface FormValues {
  name: string;
  status: "completed" | "hold" | "balance";
  worker: string;
  date: string;
  amount: number;
  percentage: number;
  total: number;
}
