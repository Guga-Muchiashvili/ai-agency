"use client";
import { timePeriods } from "@/common/constants/constants";
import LeaderBoardElement from "@/common/elements/LeaderBoardElement/LeaderBoardElement";
import OutputBoxElement from "@/common/elements/OutputBoxElement/OutputBoxElement";
import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import ChartTableElement from "./elements/ChartTableElement/ChartTableElement";

const DashboardPage = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filter, setfilter] = useState("overall");

  return (
    <div className="text-white w-full h-full flex ">
      <div className="w-[75%] relative h-full flex flex-col">
        <div className="ml-auto flex relative gap-2 items-center pr-2">
          <div
            className={`w-fit px-2 flex items-center gap-2 ${
              !showFilter && "opacity-0 pointer-events-none"
            }`}
          >
            {timePeriods.map((item) => (
              <h1
                key={item}
                className={`${
                  filter == item
                    ? "bg-white text-black"
                    : "bg-gray-400 bg-opacity-30 text-gray-300"
                } px-3 py-1 rounded-md cursor-pointer duration-500 font-bebas text-xl`}
                onClick={() => setfilter(item)}
              >
                {item}
              </h1>
            ))}
          </div>
          <IoFilterSharp
            className="text-2xl cursor-pointer mb-1"
            onClick={() => setShowFilter((prev) => !prev)}
          />
        </div>
        <div className="w-full h-64 px-3 items-center gap-6 mt-6 flex">
          <OutputBoxElement title={`${filter}`} price="3,197$" />
          <OutputBoxElement title="elenka" price="980$" />
          <OutputBoxElement title="fionna" price="2,217$" />
          <OutputBoxElement title="katte" price="0$" />
        </div>
        <div className="w-full h-full">
          <ChartTableElement />
        </div>
      </div>
      <div className="w-[25%] h-full rounded-lg mt-auto flex flex-col p-3 gap-5 py-2">
        <h1 className="text-4xl font-bebas mx-auto mt-1">Leaderboard</h1>
        <LeaderBoardElement model="fionna" name="vano" money="30$" />
        <LeaderBoardElement model="fionna" name="p3rsi" money="2,180$" />
        <LeaderBoardElement model="elenka" name="sicho" money="680$" />
        <LeaderBoardElement model="elenka" name="kakasha" money="280$" />
        <LeaderBoardElement model="kattia" name="oto" money="0$" />
        <LeaderBoardElement model="kattia" name="adesha" money="0$" />
      </div>
    </div>
  );
};

export default DashboardPage;
