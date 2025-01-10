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

    const workers = await db.worker.findMany({
      where: { modelId: id },
    });

    const currentDate = new Date();
    let chartData: { workerName: string; earnings: number[] }[] = [];

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

    function createEarningsArray(size: number) {
      return Array(size).fill(0);
    }

    if (filter === "last Month") {
      const thirtyDaysAgo = new Date(currentDate);
      thirtyDaysAgo.setDate(currentDate.getDate() - 30);

      const dateRange = workers.map((worker) => ({
        workerName: worker.name,
        earnings: createEarningsArray(30),
      }));

      earningsWithParsedDates.forEach((earning) => {
        const earningDate = earning.parsedDate;
        if (earningDate >= thirtyDaysAgo && earningDate <= currentDate) {
          const dayIndex = Math.floor(
            (currentDate.getTime() - earningDate.getTime()) / (1000 * 3600 * 24)
          );
          const workerIndex = workers.findIndex(
            (worker) => worker.id === earning.workerId
          );
          if (workerIndex !== -1 && dayIndex < 30) {
            dateRange[workerIndex].earnings[dayIndex] += Number(earning.total);
          }
        }
      });

      chartData = dateRange;
      chartData.forEach((workerData) => {
        workerData.earnings.reverse();
      });
    } else if (filter === "last Week") {
      const sevenDaysAgo = new Date(currentDate);
      sevenDaysAgo.setDate(currentDate.getDate() - 7);

      const dateRange = workers.map((worker) => ({
        workerName: worker.name,
        earnings: createEarningsArray(7),
      }));

      earningsWithParsedDates.forEach((earning) => {
        const earningDate = earning.parsedDate;
        if (earningDate >= sevenDaysAgo && earningDate <= currentDate) {
          const dayIndex = Math.floor(
            (currentDate.getTime() - earningDate.getTime()) / (1000 * 3600 * 24)
          );
          const workerIndex = workers.findIndex(
            (worker) => worker.id === earning.workerId
          );
          if (workerIndex !== -1 && dayIndex < 7) {
            dateRange[workerIndex].earnings[dayIndex] += Number(earning.total);
          }
        }
      });

      chartData = dateRange;
      chartData.forEach((workerData) => {
        workerData.earnings.reverse();
      });
    } else {
      const timeDifferenceInMs =
        currentDate.getTime() - firstTransactionDate.getTime();
      const oneMonthInMs = 1000 * 3600 * 24 * 30;
      const oneYearInMs = oneMonthInMs * 12;

      if (timeDifferenceInMs <= oneMonthInMs) {
        const monthsBetween = Math.ceil(timeDifferenceInMs / oneMonthInMs);

        const dateRange = [...Array(monthsBetween)].map((_, index) => {
          const date = new Date(firstTransactionDate);
          date.setMonth(date.getMonth() + index);
          return `${date.getFullYear()}-${date.getMonth() + 1}`;
        });

        chartData = workers.map((worker) => ({
          workerName: worker.name,
          earnings: createEarningsArray(dateRange.length),
        }));

        earningsWithParsedDates.forEach((earning) => {
          const earningYearMonth = `${earning.parsedDate.getFullYear()}-${
            earning.parsedDate.getMonth() + 1
          }`;
          const monthIndex = dateRange.indexOf(earningYearMonth);

          if (monthIndex !== -1) {
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
      } else if (
        timeDifferenceInMs > oneMonthInMs &&
        timeDifferenceInMs <= oneYearInMs
      ) {
        const monthsBetween = Math.ceil(
          (currentDate.getTime() - firstTransactionDate.getTime()) /
            oneMonthInMs
        );

        const dateRange = [...Array(monthsBetween)].map((_, index) => {
          const date = new Date(firstTransactionDate);
          date.setMonth(date.getMonth() + index);
          return `${date.getFullYear()}-${date.getMonth() + 1}`;
        });

        chartData = workers.map((worker) => ({
          workerName: worker.name,
          earnings: createEarningsArray(dateRange.length),
        }));

        earningsWithParsedDates.forEach((earning) => {
          const earningYearMonth = `${earning.parsedDate.getFullYear()}-${
            earning.parsedDate.getMonth() + 1
          }`;
          const monthIndex = dateRange.indexOf(earningYearMonth);

          if (monthIndex !== -1) {
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
      } else if (timeDifferenceInMs > oneYearInMs) {
        const yearsBetween = Math.ceil(timeDifferenceInMs / oneYearInMs);

        const dateRange = [...Array(yearsBetween)].map((_, index) => {
          const date = new Date(firstTransactionDate);
          date.setFullYear(date.getFullYear() + index);
          return `${date.getFullYear()}`;
        });

        chartData = workers.map((worker) => ({
          workerName: worker.name,
          earnings: createEarningsArray(dateRange.length),
        }));

        earningsWithParsedDates.forEach((earning) => {
          const earningYear = `${earning.parsedDate.getFullYear()}`;
          const yearIndex = dateRange.indexOf(earningYear);

          if (yearIndex !== -1) {
            const workerIndex = workers.findIndex(
              (worker) => worker.id === earning.workerId
            );
            if (workerIndex !== -1) {
              chartData[workerIndex].earnings[yearIndex] += Number(
                earning.total
              );
            }
          }
        });
      }
    }

    chartData = chartData.map((workerData) => ({
      ...workerData,
      earnings: workerData.earnings.map((earning) => earning || 0),
    }));

    return { earnings: earningsWithParsedDates, chartData };
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

    return { chartData };
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
