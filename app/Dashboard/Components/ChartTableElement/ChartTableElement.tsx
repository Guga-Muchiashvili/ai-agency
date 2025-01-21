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
import { IChartData } from "@/common/types/types";

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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 10,
        },
        maxRotation: 0,
        minRotation: 0,
      },
    },
    y: {
      ticks: {
        font: {
          size: 12,
        },
      },
    },
  },
};

const ChartTableElement = ({
  labels,
  dataset,
}: {
  labels: string[] | undefined;
  dataset: IChartData[];
}) => {
  const data = {
    labels,
    datasets: dataset,
  };

  return (
    <div className="w-full h-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default ChartTableElement;
