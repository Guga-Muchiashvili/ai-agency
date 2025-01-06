import { useEffect, useState } from "react";

const useChartLabels = (filter: "overall" | "last Month" | "last Week") => {
  const [labels, setLabels] = useState<string[]>([]);

  const getCurrentMonthDays = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
  };

  useEffect(() => {
    switch (filter) {
      case "overall":
        setLabels(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]);
        break;
      case "last Week":
        setLabels(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
        break;
      case "last Month":
        setLabels(getCurrentMonthDays());
        break;
      default:
        setLabels([]);
    }
  }, [filter]);

  return labels;
};

export default useChartLabels;
