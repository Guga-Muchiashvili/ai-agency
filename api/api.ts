"use server";
import { db } from "@/common/utils/db";

export const createEarning = async ({
  amount,
  createdAt,
  lead,
  percentage,
  status,
  total,
  workerId,
  modelId,
}: {
  amount: number;
  createdAt: string;
  lead: string;
  percentage: string;
  status: string;
  total: string;
  workerId: string;
  modelId: string;
}) => {
  try {
    const newEarning = await db.earning.create({
      data: {
        amount,
        createdAt,
        lead,
        modelId,
        percentage,
        status,
        total,
        workerId,
      },
    });

    const model = await db.model.findUnique({
      where: { id: modelId },
      select: { earnings: true },
    });

    const updatedEarnings = model?.earnings
      ? [...model.earnings, newEarning.id]
      : [newEarning.id];

    const modelUpdated = await db.model.update({
      where: { id: modelId },
      data: {
        earnings: updatedEarnings,
      },
    });

    const worker = await db.worker.findUnique({
      where: { id: workerId },
    });

    const profit =
      worker?.profit &&
      Number(worker?.profit) + (Number(total) / 100) * (Number(percentage) - 3);

    const updatedWorkerEarnings = worker?.earnings
      ? [...worker.earnings, newEarning.id]
      : [newEarning.id];

    const workerUpdated = await db.worker.update({
      where: { id: workerId },
      data: {
        earnings: updatedWorkerEarnings,
        profit: `${Number(profit).toFixed(1)}`,
      },
    });

    return newEarning || modelUpdated || workerUpdated;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
