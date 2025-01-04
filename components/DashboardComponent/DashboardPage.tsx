"use client";
import { timePeriods } from "@/common/constants/constants";
import LeaderBoardElement from "@/common/elements/LeaderBoardElement/LeaderBoardElement";
import OutputBoxElement from "@/common/elements/OutputBoxElement/OutputBoxElement";
import React, { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import ChartTableElement from "./elements/ChartTableElement/ChartTableElement";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filter, setfilter] = useState<"overall" | "last Month" | "last Week">(
    "overall"
  );

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
    if (filter == "overall")
      return setLabels(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]);
    if (filter == "last Week")
      return setLabels(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    if (filter == "last Month") {
      const currentMonthDays = getCurrentMonthDays();
      return setLabels(currentMonthDays);
    }
  }, [filter]);

  return (
    <div className="text-white w-full h-full flex ">
      <div className="w-[75%] relative h-full flex flex-col">
        <div className="ml-auto flex relative gap-2 items-center pr-2">
          <div
            className={`w-fit px-2 flex items-center gap-2 ${
              !showFilter && "opacity-0 pointer-events-none"
            }`}
          >
            {timePeriods.map((item, i) => (
              <motion.h1
                initial={{ opacity: 0, translateX: 10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                key={item}
                className={`${
                  filter == item
                    ? "bg-white text-black"
                    : "bg-gray-400 bg-opacity-30 text-gray-300"
                } px-3 py-1 rounded-md cursor-pointer duration-500 font-bebas text-xl`}
                onClick={() =>
                  setfilter(item as "overall" | "last Month" | "last Week")
                }
              >
                {item}
              </motion.h1>
            ))}
          </div>
          <IoFilterSharp
            className="text-2xl cursor-pointer mb-1"
            onClick={() => setShowFilter((prev) => !prev)}
          />
        </div>
        <div className="w-full h-64 px-3 items-center gap-6 mt-6 flex">
          <OutputBoxElement index={1} title={`${filter}`} price="3,197$" />
          <OutputBoxElement index={2} title="elenka" price="980$" />
          <OutputBoxElement index={3} title="fionna" price="2,217$" />
          <OutputBoxElement index={4} title="katte" price="0$" />
        </div>
        <div className="w-full h-full">
          <ChartTableElement labels={labels} />
        </div>
      </div>
      <div className="w-[25%] h-full rounded-lg mt-auto flex flex-col p-3 gap-5 py-2">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-4xl font-bebas mx-auto mt-1"
        >
          Leaderboard
        </motion.h1>
        <LeaderBoardElement index={1} model="fionna" name="vano" money="30$" />
        <LeaderBoardElement
          index={2}
          model="fionna"
          name="p3rsi"
          money="2,180$"
        />
        <LeaderBoardElement
          index={3}
          model="elenka"
          name="sicho"
          money="680$"
        />
        <LeaderBoardElement
          index={4}
          model="elenka"
          name="kakasha"
          money="280$"
        />
        <LeaderBoardElement index={5} model="kattia" name="oto" money="0$" />
        <LeaderBoardElement index={6} model="kattia" name="adesha" money="0$" />
      </div>
    </div>
  );
};

export default DashboardPage;
