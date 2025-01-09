import { useEffect, useState } from "react";

const useChartForModels = (
  filter:
    | "overall"
    | "last Month"
    | "last Week"
    | "last 7 days"
    | "last 30 days",
  earnings:
    | { workerName: string; earnings: number[] }[]
    | { modelName: string; earnings: number[] }[]
    | undefined
) => {
  const [labels, setLabels] = useState<string[]>([]);

  const getLastNDays = (n: number) => {
    const now = new Date();
    const labels = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = n - 1; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(now.getDate() - i);

      const formattedDate = `${monthNames[day.getMonth()]} ${day.getDate()}`;
      labels.push(formattedDate);
    }
    return labels;
  };

  useEffect(() => {
    switch (filter) {
      case "overall":
        if (earnings && earnings.length > 0) {
          setLabels(
            Array.from(
              { length: earnings[0].earnings.length },
              (_, i) => `${i + 1}`
            )
          );
        } else {
          setLabels([]);
        }
        break;
      case "last Week":
        setLabels(getLastNDays(7));
        break;
      case "last Month":
        setLabels(getLastNDays(30));
        break;
      default:
        setLabels([]);
    }
  }, [filter, earnings]);

  return labels;
};

export default useChartForModels;
