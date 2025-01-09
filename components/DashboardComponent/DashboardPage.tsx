"use client";
import { timePeriods } from "@/common/constants/constants";
import LeaderBoardElement from "@/app/Dashboard/Components/LeaderBoardElement/LeaderBoardElement";
import OutputBoxElement from "@/app/Dashboard/Components/OutputBoxElement/OutputBoxElement";
import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import ChartTableElement from "../../app/Dashboard/Components/ChartTableElement/ChartTableElement";
import { motion } from "framer-motion";
import { useGetWorkers } from "@/queries/useGetWorkersQuery/useGetWorkersQuert";
import { useGetModels } from "@/queries/useGetModelsQuery/useGetModelsQuery";
import { transformLeaderboardData } from "../../common/actions/transformData/transformData";
import { useGetDashboardData } from "@/queries/useGetDashboardQuery/useGetDashboardQuery";
import { useGetChartEarningData } from "@/queries/useGetChartEarningQuery/useGetChartEarningQuery";
import useChartForModels from "@/common/hooks/useChartForModel";

const DashboardPage = ({}) => {
  const [showFilter, setShowFilter] = useState(true);
  const [filter, setfilter] = useState<"overall" | "last Month" | "last Week">(
    "overall"
  );

  const { data } = useGetWorkers();
  const { data: models } = useGetModels();

  const workers = transformLeaderboardData(data, models);
  const { data: chartEarning } = useGetChartEarningData({ filter });

  const chartData =
    chartEarning?.chartData?.map((item, i) => ({
      label: item.modelName,
      data: item.earnings,
      borderColor: i == 0 ? "white" : i == 1 ? "#DAA520" : "#9F2B68",
      backgroundColor: i == 0 ? "white" : i == 1 ? "#DAA520" : "#9F2B68",
    })) ||
    ([] as {
      label: string;
      data: number[] | undefined;
      borderColor: string;
      backgroundColor: string;
    }[]);

  const labels = useChartForModels(filter, chartEarning?.chartData);

  const { data: dashboardData } = useGetDashboardData({ filter: filter });

  return (
    <div className="text-white w-full min-h-fit flex flex-col py-4">
      <div className="w-full h-[20vh] lg:h-[28vh] relative flex flex-col">
        <div className="ml-auto flex relative gap-2 pr-2">
          <div
            className={`w-fit flex items-center gap-2 flex-wrap ${
              !showFilter && "opacity-0 pointer-events-none"
            }`}
          >
            {timePeriods.map((item, i) => (
              <motion.h1
                initial={{ opacity: 0, translateX: 10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                }}
                key={item}
                className={`${
                  filter === item
                    ? "bg-white text-black"
                    : "bg-gray-400 bg-opacity-30 text-gray-300"
                } px-1 lg:px-3 py-1 rounded-md cursor-pointer duration-500 font-bebas text-sm lg:text-xl`}
                onClick={() =>
                  setfilter(item as "overall" | "last Month" | "last Week")
                }
              >
                {item}
              </motion.h1>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <IoFilterSharp
              className="text-xl lg:text-2xl cursor-pointer mt-1"
              onClick={() => setShowFilter((prev) => !prev)}
            />
          </motion.div>
        </div>
        <div className="w-full flex-wrap lg:flex-nowrap justify-center h-full lg:fit xl:px-3 items-center gap-2 xl:gap-6 mt-5 lg:mt-2 flex">
          {dashboardData?.map((item, i) => (
            <OutputBoxElement
              key={item.name}
              index={i}
              title={`${item.name}`}
              price={`${item.money}$`}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex h-full flex-col xl:flex-row">
        <div className="w-full mt-12 xl:mt-0 h-[60vh] xl:w-[75%]">
          <ChartTableElement dataset={chartData} labels={labels} />
        </div>
        <div
          className="xl:w-[26%] w-full mt-5 xl:mt-0 hide-scrollbar xl:ml-4 overflow-hidden flex flex-col gap-5 p-2 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 40vh)" }}
        >
          {workers?.map((item, i) => (
            <LeaderBoardElement
              img={item.img}
              key={i}
              index={i}
              model={item.model}
              money={item.profit}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
