"use server";
import { ChangeStatusMutationVariables } from "@/app/Dashboard/Components/PaymentTableElement/types";
import { Iearning, IFormLead } from "@/common/types/types";
import { db } from "@/common/utils/db";
import { IdeleteEarningByNamesProps } from "./types";

export const createEarning = async ({
  amount,
  createdAt,
  lead,
  percentage,
  status,
  total,
  workerId,
  modelId,
}: Iearning) => {
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
      Number(worker?.profit) +
        (Number(total) / 100) * (Number(percentage) - 3.5);

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
}: IdeleteEarningByNamesProps) => {
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

    updatedProfit -= (Number(total) / 100) * (Number(percentage) - 3.5);

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
export const changeEarningStatus = async (
  variables: ChangeStatusMutationVariables
) => {
  const { earningId, newStatus } = variables;

  try {
    const earning = await db.earning.findUnique({
      where: { id: earningId },
    });

    if (!earning) {
      throw new Error("Earning not found");
    }

    const updatedEarning = await db.earning.update({
      where: { id: earningId },
      data: { status: newStatus },
    });

    const model = await db.model.findUnique({
      where: { id: earning.modelId },
      select: { earnings: true },
    });

    if (model) {
      const updatedModelEarnings = model.earnings.map((id) =>
        id === earningId ? updatedEarning.id : id
      );

      await db.model.update({
        where: { id: earning.modelId },
        data: { earnings: updatedModelEarnings },
      });
    }

    const worker = await db.worker.findUnique({
      where: { id: earning.workerId },
    });

    if (worker) {
      const updatedWorkerEarnings = worker.earnings.map((id) =>
        id === earningId ? updatedEarning.id : id
      );

      await db.worker.update({
        where: { id: earning.workerId },
        data: { earnings: updatedWorkerEarnings },
      });
    }

    return updatedEarning;
  } catch (error) {
    console.error("Error changing earning status:", error);
    throw new Error("Failed to change earning status");
  }
};

export const createLead = async ({
  name,
  img,
  modelId,
  workerId,
  active,
  seen,
  description,
}: IFormLead & { img: string }) => {
  try {
    const worker = await db.worker.findFirst({
      where: { name: workerId },
    });

    if (!worker) {
      throw new Error("Worker not found");
    }

    const newLead = await db.lead.create({
      data: {
        name,
        img,
        modelId,
        workerId: worker.id,
        active,
        seen,
        description,
        notes: JSON.stringify(""),
      },
    });

    return newLead;
  } catch (error) {
    console.error("Error creating lead:", error);
    throw new Error("Failed to create lead");
  }
};

export const deleteLead = async (leadId: string) => {
  try {
    const lead = await db.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    await db.lead.delete({
      where: { id: leadId },
    });

    return { success: true, message: "Lead deleted successfully" };
  } catch (error) {
    console.error("Error deleting lead:", error);
    throw new Error("Failed to delete lead");
  }
};

export const addNoteToLead = async (params: {
  leadId: string;
  noteContent: string;
}) => {
  const { leadId, noteContent } = params;
  try {
    const date = new Date().toISOString();

    const lead = await db.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    let existingNotes = lead.notes;

    if (!Array.isArray(existingNotes)) {
      existingNotes = [];
    }

    const newNoteWithDate = {
      content: noteContent,
      date: date,
    };

    const updatedNotes = [...existingNotes, newNoteWithDate];

    await db.lead.update({
      where: { id: leadId },
      data: {
        notes: updatedNotes,
      },
    });

    return {
      success: true,
      message: "Note added successfully",
    };
  } catch (error) {
    throw new Error(`Error adding note: ${error}`);
  }
};
