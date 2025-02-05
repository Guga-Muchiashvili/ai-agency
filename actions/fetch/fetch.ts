"use server";

import { transformLeaderboardData } from "@/common/actions/transformData/transformData";
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

      chartData = dateRange;

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

      chartData = dateRange;

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

        chartData = dateRange.reverse();

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
      if (timeDiffInDays > 365) {
        const totalMonths =
          (currentDate.getFullYear() - firstTransactionDate.getFullYear()) *
            12 +
          (currentDate.getMonth() - firstTransactionDate.getMonth()) +
          1;
        arrayLength = totalMonths;
      } else if (timeDiffInDays <= 30) {
        arrayLength = 30;
      } else {
        arrayLength = Math.ceil(timeDiffInDays / 7);
      }
    } else if (filter === "last Month") {
      arrayLength = 30;
    } else if (filter === "last Week") {
      arrayLength = 7;
    }

    const generateLabel = (index: number): string => {
      const labels = [];
      let startDate: Date;
      let endDate: Date;

      if (filter === "overall") {
        if (timeDiffInDays > 365) {
          startDate = new Date(firstTransactionDate);
          startDate.setMonth(startDate.getMonth() + index);
          endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + 1);
          labels.push(
            `${startDate.toLocaleString("en-US", {
              month: "short",
              year: "numeric",
            })} - ${endDate.toLocaleString("en-US", {
              month: "short",
              year: "numeric",
            })}`
          );
        } else if (timeDiffInDays <= 30) {
          const start = new Date(currentDate);
          start.setDate(currentDate.getDate() - (30 - index));
          endDate = new Date(start);
          endDate.setDate(endDate.getDate() + 1);
          labels.push(
            `${start.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })} - ${endDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}`
          );
        } else {
          startDate = new Date(firstTransactionDate);
          startDate.setDate(startDate.getDate() + index * 7);
          endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 7);
          labels.push(
            `${startDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })} - ${endDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}`
          );
        }
      } else if (filter === "last Month") {
        const last30DaysStart = new Date();
        last30DaysStart.setDate(currentDate.getDate() - 30);
        startDate = new Date(
          last30DaysStart.getTime() + index * (1000 * 3600 * 24)
        );
        endDate = new Date(startDate.getTime() + 1000 * 3600 * 24);
        labels.push(
          `${startDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })} - ${endDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`
        );
      } else if (filter === "last Week") {
        const last7DaysStart = new Date();
        last7DaysStart.setDate(currentDate.getDate() - 7);
        startDate = new Date(
          last7DaysStart.getTime() + index * (1000 * 3600 * 24)
        );
        endDate = new Date(startDate.getTime() + 1000 * 3600 * 24);
        labels.push(
          `${startDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })} - ${endDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`
        );
      }
      return labels.join(" - ");
    };

    models.forEach((model) => {
      const modelEarnings = earningsWithParsedDates.filter(
        (earning) => earning.modelId === model.id
      );

      const earningsArray = Array(arrayLength).fill(0);

      modelEarnings.forEach((earning) => {
        const earningDate = earning.parsedDate;

        if (filter === "overall") {
          if (timeDiffInDays > 365) {
            const monthIndex =
              (earningDate.getFullYear() - firstTransactionDate.getFullYear()) *
                12 +
              (earningDate.getMonth() - firstTransactionDate.getMonth());
            earningsArray[monthIndex] += Number(earning.total);
          } else if (timeDiffInDays <= 30) {
            const daysAgo = Math.floor(
              (currentDate.getTime() - earningDate.getTime()) /
                (1000 * 3600 * 24)
            );
            if (daysAgo < 30) {
              earningsArray[29 - daysAgo] += Number(earning.total);
            }
          } else {
            const weekIndex = Math.floor(
              (currentDate.getTime() - earningDate.getTime()) /
                (1000 * 3600 * 24 * 7)
            );
            earningsArray[arrayLength - 1 - weekIndex] += Number(earning.total);
          }
        } else if (filter === "last Month") {
          const last30DaysStart = new Date();
          last30DaysStart.setDate(currentDate.getDate() - 30);

          if (earningDate >= last30DaysStart && earningDate <= currentDate) {
            const daysAgo = Math.floor(
              (currentDate.getTime() - earningDate.getTime()) /
                (1000 * 3600 * 24)
            );
            earningsArray[29 - daysAgo] += Number(earning.total);
          }
        } else if (filter === "last Week") {
          const last7DaysStart = new Date();
          last7DaysStart.setDate(currentDate.getDate() - 7);

          if (earningDate >= last7DaysStart && earningDate <= currentDate) {
            const daysAgo = Math.floor(
              (currentDate.getTime() - earningDate.getTime()) /
                (1000 * 3600 * 24)
            );
            earningsArray[6 - daysAgo] += Number(earning.total);
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

    const result = await Promise.all(
      workers.map(async (worker) => {
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

    workers = workers.filter((item) => item.name !== "Admin");

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
