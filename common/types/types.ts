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

export interface Iearning {
  amount: number;
  modelId: string;
  workerId: string;
  createdAt: string;
  status: string;
  percentage: string;
  total: string;
  lead: string;
}

export interface Imodel {
  age: string;
  country: string;
  date: string;
  description: string;
  drive: string;
  earnings: string[];
  id: string;
  image: string;
  name: string;
  workers: string[];
}

export interface Iworker {
  earnings: string[];
  id: string;
  modelId: string;
  name: string;
  profit: string;
}

export interface ILead {
  id: string;
  name: string;
  img: string;
  modelId: string[];
  workerId: string;
  notes: JSON;
  active: boolean;
  seen: boolean;
  description: string;
}

export interface IFormLead {
  name: string;
  img: string;
  modelId: string[];
  workerId: string;
  active: boolean;
  seen: boolean;
  description?: string;
}
