"use client";
import { timePeriods } from "@/common/constants/constants";
import LeaderBoardElement from "@/common/elements/LeaderBoardElement/LeaderBoardElement";
import OutputBoxElement from "@/common/elements/OutputBoxElement/OutputBoxElement";
import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import ChartTableElement from "./elements/ChartTableElement/ChartTableElement";
import { motion } from "framer-motion";
import { useGetWorkers } from "@/queries/useGetWorkersQuery/useGetWorkersQuert";
import { useGetModels } from "@/queries/useGetModelsQuery/useGetModelsQuery";
import { transformLeaderboardData } from "./transformData/transformData";
import useChartLabels from "@/common/hooks/useChartLabel";

const DashboardPage = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filter, setfilter] = useState<"overall" | "last Month" | "last Week">(
    "overall"
  );

  const { data } = useGetWorkers();
  const { data: models } = useGetModels();

  const workers = transformLeaderboardData(data, models);

  const labels = useChartLabels(filter);

  return (
    <div className="text-white w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full h-[20vh] lg:h-[35vh] relative flex flex-col">
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
        <div className="w-full h-24 lg:h-64 xl:px-3 items-center gap-2 xl:gap-6 mt-1 flex">
          <OutputBoxElement index={1} title={`${filter}`} price="3,197$" />
          <OutputBoxElement index={2} title="elenka" price="980$" />
          <OutputBoxElement index={3} title="fionna" price="2,217$" />
          <OutputBoxElement index={4} title="katte" price="0$" />
        </div>
      </div>
      <div className="w-full flex h-full flex-col xl:flex-row">
        <div className="w-full h-full xl:w-[75%]">
          <ChartTableElement
            dataset={[
              {
                label: "Fionna",
                data: [0, 200, 500, 254, 560, 120, 970],
                borderColor: "white",
                backgroundColor: "white",
              },
              {
                label: "Katte",
                data: [0, 100, 361, 694, 260, 420, 270],
                borderColor: "#9F2B68",
                backgroundColor: "#9F2B68",
              },
              {
                label: "Elenka",
                data: [0, 500, 550, 24, 20, 310, 170],
                borderColor: "#DAA520",
                backgroundColor: "#DAA520",
              },
            ]}
            labels={labels}
          />
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
