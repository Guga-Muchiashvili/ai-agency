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

const ChartTableElement = ({ labels }: { labels: string[] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Fionna",
        data: [0, 200, 500, 254, 560, 120, 970],
        borderColor: "white",
        backgroundColor: "white",
      },
      {
        label: "Katte",
        data: [0, 100, 361, 694, 260, 420, 270],
        borderColor: "#9F2B68",
        backgroundColor: "#9F2B68",
      },
      {
        label: "Elenka",
        data: [0, 500, 550, 24, 20, 310, 170],
        borderColor: "#DAA520",
        backgroundColor: "#DAA520",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default ChartTableElement;
