"use client";

import OutputBoxElement from "@/app/Dashboard/Components/OutputBoxElement/OutputBoxElement";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGetMilestoneData } from "@/queries/useGetMilestonePageQuery/useGetMilestonePageQuery";

const GoalCircle = ({
  size = 320,
  progress = 0,
  text = "Goal",
  color = "#4CAF50",
  bgColor = "#e0e0e0",
  goal = "0/0",
}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
      </svg>
      <div
        className="absolute top-1/2 left-1/2 text-center font-semibold"
        style={{
          transform: "translate(-50%, -50%)",
          fontSize: size * 0.18,
        }}
      >
        {text}
        <div style={{ fontSize: size * 0.08, color: color }}>{progress}%</div>
        <div style={{ fontSize: size * 0.1, color: color }}>{goal}</div>
      </div>
    </div>
  );
};

const MilestoneComponent = () => {
  const [size, setSize] = useState(180);
  const { data } = useGetMilestoneData();

  useEffect(() => {
    const updateSize = () => {
      setSize(Math.min(window.innerWidth * 0.8, 320));
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="text-white w-[98vw] xl:w-[80vw] min-h-fit flex flex-col gap-3 py-4 font-bebas">
      <div className="w-full flex-wrap lg:flex-nowrap justify-center h-full lg:fit xl:px-3 items-center gap-2 xl:gap-6 mt-5 lg:mt-8 flex">
        <OutputBoxElement
          key={1}
          index={0}
          title={`Date`}
          price={(data?.milestonePeriod as string) || ""}
        />
        <OutputBoxElement
          key={2}
          index={1}
          title={`Money In`}
          price={(data?.moneyIn as string) || "0"}
        />
        <OutputBoxElement
          key={3}
          index={2}
          title={`Total Percentage`}
          price={data?.totalPercentage as string}
        />
      </div>
      <div className="w-full h-full p-2 py-5 flex flex-wrap justify-center lg:justify-between gap-6 mt-5">
        {data?.modelData.map((item) => (
          <GoalCircle
            key={item.modelName}
            size={size}
            progress={Number(item.percentage)}
            text={item.modelName}
            color="white"
            bgColor="#555"
            goal={`${item.earnings.toFixed(1)}$/${item.milestoneTarget}$`}
          />
        ))}
      </div>
      <div className="w-full h-full py-5">
        <h1 className="text-4xl">LeaderBoard</h1>
        <div className="w-full flex gap-5 mt-5 flex-wrap">
          {data?.leaderboard.map((item, i) => (
            <div
              className="w-80 h-24 rounded-xl border-[1px] border-white flex items-center justify-between px-5"
              key={item.name}
            >
              <div className="flex items-center gap-4">
                <h1 className="text-4xl">{i + 1}</h1>
                <Image
                  src={item.img}
                  alt="pfp"
                  width={1000}
                  height={1000}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl">{item.name}</h1>
                  <h1 className="text-gray-300">{item.modelName}</h1>
                </div>
              </div>
              <h1 className="text-4xl">{item.totalEarnings}$</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MilestoneComponent;
