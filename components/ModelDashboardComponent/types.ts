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
