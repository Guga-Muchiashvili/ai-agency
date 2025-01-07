export interface IModelDashboardProps {
  data: {
    id: string;
    name: string;
    workers: string[];
    description: string;
    age: string;
    country: string;
    date: string;
    telegram: string;
    drive: string;
    email: string;
    password: string;
    image: string;
  } | null;
  workers: {
    id: string;
    name: string;
    modelId: string;
    earnings: string[];
    profit: string;
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
