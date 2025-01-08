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

    console.log(newEarning);

    await db.model.update({
      where: { id: modelId },
      data: {
        earnings: {
          connect: { id: newEarning.id },
        },
      },
    });
    return newEarning;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
