import sichinava from "../../../public/sicho.jpg";
import adesha from "../../../public/adesha.jpg";
import otari from "../../../public/oto.jpg";
import kakasha from "../../../public/kakasha.jpg";
import gega from "../../../public/p3rsi.png";

import { StaticImageData } from "next/image";
import { FormValues } from "@/components/ModelDashboardComponent/types";
import { IWorker } from "@/common/types/types";

const nameToImageMap: Record<string, StaticImageData> = {
  sichinava,
  adesha,
  otari,
  kakasha,
  gega,
};

export const transformLeaderboardData = (
  workers:
    | { id: string; name: string; modelId: string; profit: number | string }[]
    | undefined,
  models:
    | {
        name?: string;
        id?: string;
      }[]
    | undefined
) => {
  const data = workers
    ?.map((item) => {
      const profitNumber =
        typeof item.profit === "string" ? parseFloat(item.profit) : item.profit;
      const formattedProfit = profitNumber.toLocaleString();

      return {
        name: item.name,
        model:
          models?.find((model) => model.id === item.modelId)?.name || "Unknown",
        profit: formattedProfit,
        id: item.id,
        img:
          nameToImageMap[item.name] ||
          "https://i.pinimg.com/1200x/c2/65/20/c26520f649ac37dbda7d7bd40f3e040e.jpg",
        profitValue: profitNumber,
      };
    })
    .sort((a, b) => b.profitValue - a.profitValue);

  return data;
};

export const TransformEarningFormData = (
  data: FormValues,
  workers:
    | {
        name: string;
        model: string;
        profit: string;
        id: string;
        img: StaticImageData;
        profitValue: number;
      }[]
    | undefined,
  modelId: string | undefined
) => {
  const workerId = workers?.filter((item) => item.name == data.worker)[0].id;

  const finalData = {
    amount: data.amount,
    modelId,
    workerId,
    createdAt: data.date,
    status: data.status,
    percentage: `${data.percentage}`,
    total: `${data.total}`,
    lead: data.name,
  } as IWorker;

  return finalData;
};
