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

export const deleteEarningByNames = async ({
  earningId,
  workerId,
  modelName,
}: {
  earningId: string | undefined;
  workerId: string | undefined;
  modelName: string | undefined;
}) => {
  try {
    const model = await db.model.findUnique({
      where: { name: modelName },
      select: { id: true, earnings: true },
    });

    if (!model) {
      throw new Error("Model not found");
    }
    const worker = await db.worker.findFirst({
      where: { id: workerId },
      select: { id: true, earnings: true, profit: true },
    });

    if (!worker) {
      throw new Error("Worker not found");
    }

    const earning = await db.earning.findUnique({
      where: { id: earningId },
      select: { total: true, percentage: true },
    });

    if (!earning) {
      throw new Error("Earning not found");
    }

    const { total, percentage } = earning;

    const updatedModelEarnings = model.earnings.filter(
      (id) => id !== earningId
    );
    await db.model.update({
      where: { id: model.id },
      data: { earnings: updatedModelEarnings },
    });

    const updatedWorkerEarnings = worker.earnings.filter(
      (id) => id !== earningId
    );
    let updatedProfit = worker.profit ? Number(worker.profit) : 0;

    updatedProfit -= (Number(total) / 100) * (Number(percentage) - 3);

    await db.worker.update({
      where: { id: worker.id },
      data: {
        earnings: updatedWorkerEarnings,
        profit: updatedProfit.toFixed(1),
      },
    });

    await db.earning.delete({
      where: { id: earningId },
    });

    return { success: true, message: "Earning deleted successfully" };
  } catch (error) {
    console.error("Error deleting earning:", error);
    throw error;
  }
};
