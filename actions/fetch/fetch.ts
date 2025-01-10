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

    // Helper function to parse date
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
      // Filter by the last 30 days
      const lastMonthStart = new Date(currentDate);
      lastMonthStart.setDate(currentDate.getDate() - 30); // 30 days ago

      // Create an array with 30 elements for each day of the last month
      const dateRange = workers.map((worker) => ({
        workerName: worker.name,
        earnings: Array(30).fill(0), // Initialize with 30 days of data
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

      chartData = dateRange.reverse(); // Reverse the chartData after filling it
    } else if (filter === "last Week") {
      // Filter by the last 7 days
      const lastWeekStart = new Date(currentDate);
      lastWeekStart.setDate(currentDate.getDate() - 7); // 7 days ago
      const dateRange = workers.map((worker) => ({
        workerName: worker.name,
        earnings: Array(7).fill(0), // Initialize with 7 days of data
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

      chartData = dateRange.reverse();
    } else {
      // Logic for "overall" filter, including various time difference conditions
      if (timeDifferenceInMs > oneYearInMs) {
        // Group by months if more than a year ago from the first transaction
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
      } else if (timeDifferenceInMs <= oneMonthInMs) {
        // Group by days if less than a month ago from the first transaction
        const dateRange = workers.map((worker) => ({
          workerName: worker.name,
          earnings: Array(30).fill(0), // 30 days for last month filter
        }));

        earningsWithParsedDates.forEach((earning) => {
          const earningDate = earning.parsedDate;
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
        });

        chartData = dateRange;
      } else if (timeDifferenceInMs <= oneYearInMs) {
        // Group by weeks if less than a year and more than a month
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
      }
    }

    console.log(chartData);
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
