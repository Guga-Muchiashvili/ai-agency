"use server";
import { db } from "@/common/utils/db";

export async function fetchModels() {
  try {
    const models = await db.model.findMany();
    return models;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function fetchUsers() {
  try {
    const users = await db.worker.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function fetchModel({ name }: { name: string }) {
  try {
    const users = await db.model.findUnique({
      where: {
        name,
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function fetchWorkersByModel({ id }: { id: string }) {
  try {
    const users = await db.worker.findMany({
      where: {
        modelId: id,
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
export async function fetchWorkersById({ id }: { id: string }) {
  try {
    const users = await db.worker.findMany({
      where: {
        id: id,
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function fetchEarningsByModel({ id }: { id: string | undefined }) {
  try {
    const earnings = await db.earning.findMany({
      where: {
        modelId: id,
      },
    });
    return earnings;
  } catch (error) {
    console.error("Error fetching earnings:", error);
    throw error;
  }
}
export async function fetchEarnings() {
  try {
    const earnings = await db.earning.findMany();
    return earnings;
  } catch (error) {
    console.error("Error fetching earnings:", error);
    throw error;
  }
}

export async function fetchDashboardPageInfo({
  filter,
}: {
  filter: "overall" | "last Month" | "last Week";
}) {
  try {
    const earnings = await db.earning.findMany();
    const users = await db.model.findMany();

    let total = 0;
    let elenka = 0;
    let fionna = 0;
    let katte = 0;

    earnings.forEach((item) => {
      const amount = item.amount;

      const user = users.find((user) => user.id === item.modelId);

      total += amount;

      if (user) {
        switch (user.name.toLowerCase()) {
          case "elenka":
            elenka += amount;
            break;
          case "fionna":
            fionna += amount;
            break;
          case "katte":
            katte += amount;
            break;
        }
      }
    });

    const formatNumber = (num: number) => num.toLocaleString();

    return [
      { name: filter, money: formatNumber(total) },
      { name: "Elenka", money: formatNumber(elenka) },
      { name: "Fionna", money: formatNumber(fionna) },
      { name: "Katte", money: formatNumber(katte) },
    ];
  } catch (error) {
    console.error("Error fetching dashboard", error);
    throw error;
  }
}

export async function fetchModelDashboardData({
  name,
}: {
  name: string | undefined;
}) {
  try {
    const modelData = await db.model.findUnique({ where: { name } });
    if (!modelData) throw new Error("Model not found");

    const earnings = await db.earning.findMany({
      where: { modelId: modelData.id },
    });

    const total = earnings.reduce((acc, curr) => acc + Number(curr.total), 0);
    const formattedTotal = new Intl.NumberFormat().format(total);

    const { balance, hold } = earnings.reduce(
      (acc, curr) => {
        if (curr.status === "balance") {
          acc.balance += Number(curr.total);
        } else if (curr.status === "hold") {
          acc.hold += Number(curr.total);
        }
        return acc;
      },
      { balance: 0, hold: 0 }
    );

    const formattedBalance = new Intl.NumberFormat().format(balance);
    const formattedHold = new Intl.NumberFormat().format(hold);

    return {
      formattedTotal,
      formattedBalance,
      formattedHold,
    };
  } catch (error) {
    console.error("Error fetching model dashboard data:", error);
    throw error;
  }
}
