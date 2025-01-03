"use client";
import { timePeriods } from "@/common/constants/constants";
import OutputBoxElement from "@/common/elements/OutputBoxElement/OutputBoxElement";
import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

const DashboardPage = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filter, setfilter] = useState("overall");

  return (
    <div className="text-white w-full h-full flex ">
      <div className="w-3/4 relative h-full flex flex-col">
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
        <div className="w-full h-64 px-3 items-center gap-6 flex">
          <OutputBoxElement title={`${filter}`} price="3,197$" />
          <OutputBoxElement title="elenka" price="980$" />
          <OutputBoxElement title="fionna" price="2,217$" />
          <OutputBoxElement title="katte" price="0$" />
        </div>
      </div>
      <div className="w-1/4 h-full "></div>
    </div>
  );
};

export default DashboardPage;
