"use client";
import { timePeriods } from "@/common/constants/constants";
import LeaderBoardElement from "@/common/elements/LeaderBoardElement/LeaderBoardElement";
import OutputBoxElement from "@/common/elements/OutputBoxElement/OutputBoxElement";
import React, { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import ChartTableElement from "./elements/ChartTableElement/ChartTableElement";
import { motion } from "framer-motion";
import { useGetWorkers } from "@/queries/useGetWorkersQuery/useGetWorkersQuert";
import { useGetModels } from "@/queries/useGetModelsQuery/useGetModelsQuery";
import { transformLeaderboardData } from "./transformData/transformData";

const DashboardPage = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filter, setfilter] = useState<"overall" | "last Month" | "last Week">(
    "overall"
  );

  const { data } = useGetWorkers();
  const { data: models } = useGetModels();

  const workers = transformLeaderboardData(data, models);

  const [labels, setLabels] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
  ]);

  function getCurrentMonthDays() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
  }

  useEffect(() => {
    if (filter === "overall")
      return setLabels(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]);
    if (filter === "last Week")
      return setLabels(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    if (filter === "last Month") {
      const currentMonthDays = getCurrentMonthDays();
      return setLabels(currentMonthDays);
    }
  }, [filter]);

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
                } px-1 lg:px-3 py-1 rounded-md cursor-pointer duration-500 font-bebas text-lg lg:text-xl`}
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
              className="text-2xl cursor-pointer mt-1"
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
          <ChartTableElement labels={labels} />
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
