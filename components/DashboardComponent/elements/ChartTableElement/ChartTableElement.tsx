import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "AiAgency(models) chart",
    },
  },
};

const ChartTableElement = ({
  labels,
  dataset,
}: {
  labels: string[];
  dataset: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}) => {
  const data = {
    labels,
    datasets: dataset,
  };
  return <Line options={options} data={data} />;
};

export default ChartTableElement;
