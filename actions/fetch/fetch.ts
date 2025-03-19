"use server";

import {
  nameToImageMap,
  transformLeaderboardData,
} from "@/common/actions/transformData/transformData";
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
export async function fetchWorkersById({ id }: { id: string | undefined }) {
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

export async function fetchEarningsByModel({
  id,
  filter,
}: {
  id: string | undefined;
  filter: "overall" | "last Month" | "last Week";
}) {
  try {
    const earnings = await db.earning.findMany({
      where: { modelId: id },
    });
    let workers = await db.worker.findMany({
      where: { modelId: id },
    });

    workers = workers.filter((item) => item.name !== "Admin");

    const currentDate = new Date();
    let chartData: { workerName: string; earnings: number[] }[] = [];
    const chartLabels: string[] = [];

    function parseDate(dateString: string): Date {
      const [day, month, year] = dateString.split("/").map(Number);
      return new Date(year, month - 1, day);
    }

    const earningsWithParsedDates = earnings.map((earning) => ({
      ...earning,
      parsedDate: parseDate(earning.createdAt),
    }));

    earningsWithParsedDates.sort(
      (a, b) => a.parsedDate.getTime() - b.parsedDate.getTime()
    );

    const firstTransactionDate =
      earningsWithParsedDates[0]?.parsedDate || currentDate;

    const timeDifferenceInMs =
      currentDate.getTime() - firstTransactionDate.getTime();
    const oneMonthInMs = 1000 * 3600 * 24 * 30;
    const oneYearInMs = oneMonthInMs * 12;

    if (filter === "last Month") {
      const lastMonthStart = new Date(currentDate);
      lastMonthStart.setDate(currentDate.getDate() - 30);

      const dateRange = workers.map((worker) => ({
        workerName: worker.name,
        earnings: Array(30).fill(0),
      }));

      earningsWithParsedDates.forEach((earning) => {
        const earningDate = earning.parsedDate;
        if (earningDate >= lastMonthStart && earningDate <= currentDate) {
          const daysAgo = Math.floor(
            (currentDate.getTime() - earningDate.getTime()) / (1000 * 3600 * 24)
          );
          if (daysAgo < 30) {
            const workerIndex = workers.findIndex(
              (worker) => worker.id === earning.workerId
            );
            if (workerIndex !== -1) {
              dateRange[workerIndex].earnings[daysAgo] += Number(earning.total);
            }
          }
        }
      });

      chartData = dateRange.map((item) => ({
        ...item,
        earnings: item.earnings.slice().reverse(),
      }));

      for (let i = 0; i < 30; i++) {
        const labelDate = new Date(lastMonthStart);
        labelDate.setDate(lastMonthStart.getDate() + i);
        chartLabels.push(labelDate.toLocaleDateString());
      }
    } else if (filter === "last Week") {
      const lastWeekStart = new Date(currentDate);
      lastWeekStart.setDate(currentDate.getDate() - 7);
      const dateRange = workers.map((worker) => ({
        workerName: worker.name,
        earnings: Array(7).fill(0),
      }));

      earningsWithParsedDates.forEach((earning) => {
        const earningDate = earning.parsedDate;
        if (earningDate >= lastWeekStart && earningDate <= currentDate) {
          const daysAgo = Math.floor(
            (currentDate.getTime() - earningDate.getTime()) / (1000 * 3600 * 24)
          );
          if (daysAgo < 7) {
            const workerIndex = workers.findIndex(
              (worker) => worker.id === earning.workerId
            );
            if (workerIndex !== -1) {
              dateRange[workerIndex].earnings[daysAgo] += Number(earning.total);
            }
          }
        }
      });

      chartData = dateRange.map((item) => ({
        ...item,
        earnings: item.earnings.slice().reverse(),
      }));

      for (let i = 0; i < 7; i++) {
        const labelDate = new Date(lastWeekStart);
        labelDate.setDate(lastWeekStart.getDate() + i);
        chartLabels.push(
          labelDate.toLocaleDateString("default", { weekday: "short" })
        );
      }
    } else {
      if (timeDifferenceInMs > oneYearInMs) {
        const monthsBetween = Math.ceil(
          timeDifferenceInMs / (1000 * 3600 * 24 * 30)
        );
        chartData = workers.map((worker) => ({
          workerName: worker.name,
          earnings: Array(monthsBetween).fill(0),
        }));

        earningsWithParsedDates.forEach((earning) => {
          const earningDate = earning.parsedDate;
          const monthIndex = Math.floor(
            (earningDate.getTime() - firstTransactionDate.getTime()) /
              (1000 * 3600 * 24 * 30)
          );

          if (monthIndex >= 0 && monthIndex < chartData[0].earnings.length) {
            const workerIndex = workers.findIndex(
              (worker) => worker.id === earning.workerId
            );
            if (workerIndex !== -1) {
              chartData[workerIndex].earnings[monthIndex] += Number(
                earning.total
              );
            }
          }
        });

        for (let i = 0; i < monthsBetween; i++) {
          const labelDate = new Date(firstTransactionDate);
          labelDate.setMonth(firstTransactionDate.getMonth() + i);
          chartLabels.push(
            `${labelDate.toLocaleString("default", {
              month: "short",
            })} ${labelDate.getFullYear()}`
          );
        }
      } else if (timeDifferenceInMs <= oneMonthInMs) {
        const numberOfDays = Math.ceil(timeDifferenceInMs / (1000 * 3600 * 24));

        const dateRange = workers.map((worker) => ({
          workerName: worker.name,
          earnings: Array(numberOfDays).fill(0),
        }));

        earningsWithParsedDates.forEach((earning) => {
          const earningDate = earning.parsedDate;
          const daysAgo = Math.floor(
            (currentDate.getTime() - earningDate.getTime()) / (1000 * 3600 * 24)
          );

          if (daysAgo < numberOfDays) {
            const workerIndex = workers.findIndex(
              (worker) => worker.id === earning.workerId
            );
            if (workerIndex !== -1) {
              dateRange[workerIndex].earnings[daysAgo] += Number(earning.total);
            }
          }
        });

        chartData = dateRange.map((item) => ({
          workerName: item.workerName,
          earnings: item.earnings.slice().reverse(),
        }));

        for (let i = 0; i < numberOfDays; i++) {
          const labelDate = new Date(currentDate);
          labelDate.setDate(currentDate.getDate() - (numberOfDays - i));
          chartLabels.push(labelDate.toLocaleDateString());
        }
      } else if (timeDifferenceInMs <= oneYearInMs) {
        const weeksBetween = Math.ceil(
          timeDifferenceInMs / (1000 * 3600 * 24 * 7)
        );
        chartData = workers.map((worker) => ({
          workerName: worker.name,
          earnings: Array(weeksBetween).fill(0),
        }));

        earningsWithParsedDates.forEach((earning) => {
          const earningDate = earning.parsedDate;
          const weekIndex = Math.floor(
            (earningDate.getTime() - firstTransactionDate.getTime()) /
              (1000 * 3600 * 24 * 7)
          );

          if (weekIndex >= 0 && weekIndex < chartData[0].earnings.length) {
            const workerIndex = workers.findIndex(
              (worker) => worker.id === earning.workerId
            );
            if (workerIndex !== -1) {
              chartData[workerIndex].earnings[weekIndex] += Number(
                earning.total
              );
            }
          }
        });

        for (let i = 0; i < weeksBetween; i++) {
          const startDate = new Date(firstTransactionDate);
          startDate.setDate(startDate.getDate() + i * 7);
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 6);
          const label = `${startDate.toLocaleString("default", {
            month: "short",
          })} ${startDate.getDate()} - ${endDate.toLocaleString("default", {
            month: "short",
          })} ${endDate.getDate()}`;
          chartLabels.push(label);
        }
      }
    }

    return {
      earnings: earningsWithParsedDates.slice().reverse(),
      chartData,
      labels: chartLabels,
    };
  } catch (error) {
    console.error("Error fetching earnings:", error);
    throw error;
  }
}
export async function fetchEarningsByModelGroup({
  filter,
}: {
  filter: "overall" | "last Month" | "last Week";
}) {
  try {
    const models = await db.model.findMany();
    const earnings = await db.earning.findMany();

    const currentDate = new Date();

    function parseDate(dateString: string): Date {
      const [day, month, year] = dateString.split("/").map(Number);
      return new Date(year, month - 1, day);
    }

    const earningsWithParsedDates = earnings.map((earning) => ({
      ...earning,
      parsedDate: parseDate(earning.createdAt),
    }));

    const firstTransactionDate = earningsWithParsedDates.reduce(
      (earliest, earning) => {
        return earning.parsedDate < earliest ? earning.parsedDate : earliest;
      },
      new Date()
    );

    const timeDiffInDays = Math.floor(
      (currentDate.getTime() - firstTransactionDate.getTime()) /
        (1000 * 3600 * 24)
    );

    const chartData: { modelName: string; earnings: number[] }[] = [];

    let arrayLength = 0;

    if (filter === "overall") {
      if (timeDiffInDays > 30) {
        arrayLength = Math.ceil(timeDiffInDays / 14);
      } else {
        arrayLength = timeDiffInDays;
      }
    } else if (filter === "last Month") {
      arrayLength = 30;
    } else if (filter === "last Week") {
      arrayLength = 7;
    }

    const generateLabel = (index: number): string => {
      const startDate = new Date(firstTransactionDate);
      startDate.setDate(startDate.getDate() + index * 14);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 13);
      return `${startDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${endDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`;
    };

    const lastPeriodEnd = new Date(firstTransactionDate);
    lastPeriodEnd.setDate(
      lastPeriodEnd.getDate() + (arrayLength - 1) * 14 + 13
    );
    if (currentDate > lastPeriodEnd) {
      arrayLength += 1;
    }

    models.forEach((model) => {
      const modelEarnings = earningsWithParsedDates.filter(
        (earning) => earning.modelId === model.id
      );

      const earningsArray = Array(arrayLength).fill(0);

      modelEarnings.forEach((earning) => {
        const earningDate = earning.parsedDate;

        if (filter === "overall" && timeDiffInDays > 30) {
          const periodIndex = Math.floor(
            (earningDate.getTime() - firstTransactionDate.getTime()) /
              (1000 * 3600 * 24 * 14)
          );
          earningsArray[periodIndex] += Number(earning.total);
        } else {
          const daysAgo = Math.floor(
            (currentDate.getTime() - earningDate.getTime()) / (1000 * 3600 * 24)
          );
          if (daysAgo < arrayLength) {
            earningsArray[arrayLength - 1 - daysAgo] += Number(earning.total);
          }
        }
      });

      chartData.push({
        modelName: model.name,
        earnings: earningsArray,
      });
    });

    return {
      chartData,
      labels: Array.from({ length: arrayLength }).map((_, index) =>
        generateLabel(index)
      ),
    };
  } catch (error) {
    console.error("Error fetching model earnings:", error);
    throw error;
  }
}

export async function fetchDashboardPageInfo({
  filter,
}: {
  filter: "overall" | "last Month" | "last Week";
}) {
  try {
    let dateFilter: Date | undefined;
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    if (filter === "last Week") {
      dateFilter = sevenDaysAgo;
    } else if (filter === "last Month") {
      dateFilter = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
      );
    }

    const earnings = await db.earning.findMany();
    const users = await db.model.findMany();

    let total = 0;
    let elenka = 0;
    let fionna = 0;
    let Stasia = 0;

    earnings.forEach((item) => {
      const amount = item.total;

      const createdAtDate = new Date(
        item.createdAt.split("/").reverse().join("-")
      );

      if (!dateFilter || createdAtDate >= dateFilter) {
        const user = users.find((user) => user.id === item.modelId);

        total += Number(amount);

        if (user) {
          switch (user.name.toLowerCase()) {
            case "elenka":
              elenka += Number(amount);
              break;
            case "fionna":
              fionna += Number(amount);
              break;
            case "stasia":
              Stasia += Number(amount);
              break;
          }
        }
      }
    });

    const formatNumber = (num: number) => num.toLocaleString();

    return [
      { name: filter, money: formatNumber(total) },
      { name: "Elenka", money: formatNumber(elenka) },
      { name: "Fionna", money: formatNumber(fionna) },
      { name: "Stasia", money: formatNumber(Stasia) },
    ];
  } catch (error) {
    console.error("Error fetching dashboard", error);
    throw error;
  }
}
export async function fetchModelDashboardData({
  modelName,
  filter,
}: {
  modelName: string | undefined;
  filter: "overall" | "last Month" | "last Week";
}) {
  try {
    let dateFilter: Date | undefined;
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    if (filter === "last Week") {
      dateFilter = sevenDaysAgo;
    } else if (filter === "last Month") {
      dateFilter = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
      );
    }

    const models = await db.model.findMany();
    const earnings = await db.earning.findMany();

    const model = models.find(
      (m) => m.name.toLowerCase() === modelName?.toLowerCase()
    );

    if (!model) {
      throw new Error(`Model with name ${modelName} not found`);
    }

    let total = 0;
    let hold = 0;
    let balance = 0;

    earnings.forEach((item) => {
      const amount = item.total;

      const createdAtDate = new Date(
        item.createdAt.split("/").reverse().join("-")
      );

      if (
        item.modelId === model.id &&
        (filter === "overall" || (dateFilter && createdAtDate >= dateFilter))
      ) {
        total += Number(amount);

        if (item.status.toLowerCase() === "hold") {
          hold += Number(amount);
        }
        if (item.status.toLowerCase() === "balance") {
          balance += Number(amount);
        }
      }
    });

    if (hold + balance > total) {
      total = hold + balance;
    }

    const formatNumber = (num: number) => num.toLocaleString();

    return {
      formattedTotal: formatNumber(total),
      formattedBalance: formatNumber(balance),
      formattedHold: formatNumber(hold),
    };
  } catch (error) {
    console.error("Error fetching model dashboard data", error);
    throw error;
  }
}

export const getWorkersByModel = async (modelId: string | undefined) => {
  try {
    const workers = await db.worker.findMany({
      where: { modelId },
    });

    const model = await db.model.findUnique({
      where: { id: modelId },
    });

    const updatedWorkers = workers.filter((item) => item.active);

    const result = await Promise.all(
      updatedWorkers.map(async (worker) => {
        const earnings = await db.earning.findMany({
          where: { workerId: worker.id },
        });

        const totalProfit = earnings.reduce((acc, earning) => {
          const percentage = Number(earning.percentage) - 3.5;
          const profit =
            (parseFloat(earning.total.toString()) * percentage) / 100;
          return acc + profit;
        }, 0);

        return {
          id: worker.id,
          modelId: model?.id,
          name: worker.name,
          profit: totalProfit.toFixed(2),
        };
      })
    );

    return result;
  } catch (error) {
    console.error("Error fetching workers by model:", error);
    return [];
  } finally {
    await db.$disconnect();
  }
};

export const getAllModelsWithWorkers = async () => {
  try {
    const models = await db.model.findMany();
    let workers = await db.worker.findMany();
    const earnings = await db.earning.findMany();

    workers = workers.filter((item) => item.name !== "Admin" && item.active);

    const data = models
      .map((model) => {
        const modelWorkers = workers.filter(
          (worker) => worker.modelId === model.id
        );

        return modelWorkers.map((worker) => {
          const workerEarnings = earnings.filter(
            (earning) => earning.workerId === worker.id
          );

          const totalProfit = workerEarnings.reduce((acc, earning) => {
            const percentage = Number(earning.percentage) - 3.5;
            const profit =
              (parseFloat(earning.total.toString()) * percentage) / 100;
            return acc + profit;
          }, 0);

          return {
            id: worker.id,
            modelId: model.id,
            name: worker.name,
            profit: totalProfit.toFixed(2),
          };
        });
      })
      .flat();

    return transformLeaderboardData(data, models);
  } catch (error) {
    console.error("Error fetching all models with workers:", error);
    return [];
  } finally {
    await db.$disconnect();
  }
};

export async function fetchLeads(searchParams: {
  workerName: string;
  modelName: string;
  leadName: string;
}) {
  try {
    const { workerName, modelName, leadName } = searchParams;

    const leads = await db.lead.findMany();
    const models = await db.model.findMany();
    const workers = await db.worker.findMany();

    const leadsWithDetails = leads.map((lead) => {
      const modelNames = lead.modelId
        .map((modelId) => {
          const model = models.find((item) => item.id === modelId);
          return model ? model.name : null;
        })
        .filter(Boolean);

      const worker = workers.find((worker) => worker.id === lead.workerId);
      const workerName = worker ? worker.name : null;

      return {
        ...lead,
        modelId: modelNames,
        workerId: workerName,
      };
    });

    const filteredLeads = leadsWithDetails.filter((lead) => {
      const matchesWorker = workerName ? lead.workerId === workerName : true;
      const matchesModel = modelName ? lead.modelId.includes(modelName) : true;
      const matchesLeadName = leadName
        ? lead.name.toLowerCase().includes(leadName.toLowerCase())
        : true;
      return matchesWorker && matchesModel && matchesLeadName;
    });

    return filteredLeads;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
}

export async function fetchLeadById({ id }: { id: string | undefined }) {
  try {
    const models = await db.model.findMany();
    const workers = await db.worker.findMany();

    const lead = await db.lead.findUnique({
      where: {
        id: id,
      },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    const modelNames = lead.modelId.map((modelId) => {
      const model = models.find((item) => item.id === modelId);
      return model ? model.name : null;
    });

    const worker = workers.find((worker) => worker.id === lead.workerId);
    const workerName = worker ? worker.name : null;

    return { ...lead, modelId: modelNames, workerId: workerName };
  } catch (error) {
    console.error("Error fetching Lead:", error);
    throw error;
  }
}

export async function fetchTodos() {
  try {
    const todos = await db.todo.findMany();

    const todosWithWorkerNames = await Promise.all(
      todos.map(async (todo) => {
        const workers = await db.worker.findMany({
          where: { id: { in: todo.workerId } },
          select: { name: true },
        });

        return {
          ...todo,
          workerNames: workers.map((worker) => worker.name),
        };
      })
    );

    return todosWithWorkerNames;
  } catch (error) {
    console.error("Error fetching Todos:", error);
    throw error;
  }
}

export async function fetchTodoById({ id }: { id: string | undefined }) {
  try {
    const todo = await db.todo.findUnique({
      where: { id },
    });

    if (!todo) return null;

    const workers = await db.worker.findMany({
      where: { id: { in: todo.workerId } },
      select: { name: true },
    });

    return {
      ...todo,
      workerNames: workers.map((worker) => worker.name),
    };
  } catch (error) {
    console.error("Error fetching Todo:", error);
    throw error;
  }
}

export async function getCurrentMilestoneData() {
  const today = new Date();
  let startMilestone: Date;
  let endMilestone: Date;

  if (today.getDate() < 16) {
    startMilestone = new Date(today.getFullYear(), today.getMonth() - 1, 16);
    endMilestone = new Date(today.getFullYear(), today.getMonth(), 16);
  } else {
    startMilestone = new Date(today.getFullYear(), today.getMonth(), 16);
    endMilestone = new Date(today.getFullYear(), today.getMonth() + 1, 16);
  }

  const formatMilestonePeriod = (start: Date, end: Date) => {
    const startMonth = start.toLocaleString("en-US", { month: "short" });
    const endMonth = end.toLocaleString("en-US", { month: "short" });
    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}`;
  };

  const milestonePeriod = formatMilestonePeriod(startMilestone, endMilestone);

  const earnings = await db.earning.findMany();
  const models = await db.model.findMany();
  const workers = await db.worker.findMany();

  let moneyIn = 0;

  const modelData = models.map((model) => {
    const modelEarnings = earnings
      .filter((earning) => {
        if (earning.modelId !== model.id) return false;

        const createdAtDate = earning.createdAt.split("/").reverse().join("-");
        const createdAt = new Date(createdAtDate);

        return createdAt >= startMilestone && createdAt < endMilestone;
      })
      .reduce((sum, earning) => sum + earning.amount, 0);

    moneyIn += modelEarnings;

    const milestoneTarget = parseFloat(model.milestone || "0");
    const percentage = milestoneTarget
      ? ((modelEarnings / milestoneTarget) * 100).toFixed(2)
      : "0.00";

    return {
      modelName: model.name,
      earnings: modelEarnings,
      milestoneTarget,
      percentage: `${percentage}`,
    };
  });

  const totalMilestoneTarget = models.reduce(
    (sum, model) => sum + parseFloat(model.milestone || "0"),
    0
  );

  const totalPercentage = totalMilestoneTarget
    ? ((moneyIn / totalMilestoneTarget) * 100).toFixed(2)
    : "0.00";

  const workerEarningsMap: Record<string, number> = {};

  earnings.forEach((earning) => {
    const createdAtDate = earning.createdAt.split("/").reverse().join("-");
    const createdAt = new Date(createdAtDate);

    if (createdAt >= startMilestone && createdAt < endMilestone) {
      const percentage = parseFloat(earning.percentage || "0");

      if (!workerEarningsMap[earning.workerId]) {
        workerEarningsMap[earning.workerId] = 0;
      }

      workerEarningsMap[earning.workerId] +=
        (earning.amount * percentage) / 100;
    }
  });

  const leaderboard = Object.entries(workerEarningsMap)
    .map(([workerId, totalEarnings]) => {
      const worker = workers.find((w) => w.id === workerId);
      const workerModel = models.find((model) => model.id === worker?.modelId);

      const workerImage =
        nameToImageMap[worker?.name || ""] ||
        "https://i.pinimg.com/1200x/c2/65/20/c26520f649ac37dbda7d7bd40f3e040e.jpg";

      return {
        name: worker?.name || "Unknown",
        totalEarnings,
        img: workerImage,
        modelName: workerModel?.name || "Unknown Model",
      };
    })
    .sort((a, b) => b.totalEarnings - a.totalEarnings)
    .slice(0, 10);

  return {
    milestonePeriod,
    moneyIn: String(moneyIn),
    totalPercentage: `${totalPercentage}%`,
    modelData,
    leaderboard,
  };
}
