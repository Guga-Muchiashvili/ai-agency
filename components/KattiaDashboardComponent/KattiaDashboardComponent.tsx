"use client";
import ModelInfoBoxElement from "@/common/elements/ModelInfoBoxElement/ModelInfoBoxElement";
import React, { useState } from "react";
import ChartTableElement from "../DashboardComponent/elements/ChartTableElement/ChartTableElement";
import { timePeriods } from "@/common/constants/constants";
import { motion } from "framer-motion";
import { IoFilterSharp } from "react-icons/io5";
import useChartLabels from "@/common/hooks/useChartLabel";
import OutputBoxElement from "@/common/elements/OutputBoxElement/OutputBoxElement";
import PaymentTableElement from "@/common/elements/PaymentTableElement/PaymentTableElement";
import { useGetModel } from "@/queries/useGetModelQuery/useGetModelQuery";
import { useGetWorkers } from "@/queries/useGetWorkersQuery/useGetWorkersQuert";
import { transformLeaderboardData } from "../DashboardComponent/transformData/transformData";

const KattiaDashboardComponent = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filter, setfilter] = useState<"overall" | "last Month" | "last Week">(
    "overall"
  );

  const { data } = useGetModel({ name: "Katte" });

  const { data: workers } = useGetWorkers();

  const workerList = transformLeaderboardData(workers, [
    { id: data?.id, name: data?.name },
  ])?.filter((item) => item.model == "Katte");

  const labels = useChartLabels(filter);

  return (
    <div className="w-full h-fit flex ">
      <div className="w-3/4 flex hide-scrollbar gap-4 p-2 flex-col">
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
              className="text-xl text-white lg:text-2xl cursor-pointer mt-1"
              onClick={() => setShowFilter((prev) => !prev)}
            />
          </motion.div>
        </div>
        <div className="w-full h-24 lg:h-fit xl:px-3 items-center gap-2 mb-4 mt-2 xl:gap-6  flex">
          <OutputBoxElement index={1} title={`${filter}`} price="176$" />
          <OutputBoxElement index={2} title="Balance" price="62$" />
          <OutputBoxElement index={3} title="Hold" price="104$" />
        </div>
        <div className="w-full h-[50vh]">
          <ChartTableElement
            labels={labels}
            dataset={
              (workerList &&
                workerList.map((item, i) => ({
                  label: item.name,
                  data: [
                    Math.floor(Math.random() * 2000),
                    Math.floor(Math.random() * 2000),
                    Math.floor(Math.random() * 2000),
                    Math.floor(Math.random() * 2000),
                    Math.floor(Math.random() * 2000),
                    Math.floor(Math.random() * 2000),
                    Math.floor(Math.random() * 2000),
                  ],
                  borderColor: i == 0 ? "white" : "#DAA520",
                  backgroundColor: i == 0 ? "white" : "#DAA520",
                }))) ||
              []
            }
          />
        </div>
        <div className="w-full h-fit font-bebas p-4">
          <h1 className="text-4xl text-white">Transactions</h1>
          <div className="w-full text-white flex mt-5 items-center justify-between text-xl h-12 border-b-[1px] border-white ">
            <h1 className="w-[14%] text-center">name</h1>
            <h1 className="w-[14%] text-center">status</h1>
            <h1 className="w-[14%] text-center">worker</h1>
            <h1 className="w-[14%] text-center">date</h1>
            <h1 className="w-[14%] text-center">Amount</h1>
            <h1 className="w-[14%] text-center">percentage</h1>
            <h1 className="w-[14%] text-center">Total</h1>
          </div>
          <div className="w-full flex flex-col gap-3 mt-6">
            <PaymentTableElement
              amount="40"
              date="03/01/2025"
              name="pastanka"
              perc="60"
              status="completed"
              total="37"
              worker="otari"
            />
          </div>
        </div>
      </div>
      <div className="w-1/4 ">
        <ModelInfoBoxElement
          age="18"
          country="albania"
          description="sald wa;sdh wailu ds;ad hwopaiu dhs;adwah oigdd dsiaudd dush dd ausid usdihaiowud g hs;adwah oigdd dsiaudd dush dd ausid usdihaiowud g sdad wa;ui gha;iudg slady gwfaoudyfodidsgal dw"
          drive="https://drive.google.com/drive/folders/1CL6Y2FZJ3JKtW23Uneu7FHkJBvXSl7JY?dmr=1&ec=wgc-drive-hero-goto"
          instagram={{
            email: "kattiaaxo1@gmail.com",
            password: "Unamusofuli1",
          }}
          name="kattia"
          telegram="+995555002646"
          date="01/16/2006"
          workers={workerList}
          img="https://media.discordapp.net/attachments/1168089250995126363/1325899189288308868/image.png?ex=677d7758&is=677c25d8&hm=46044b5a9c2fb79bbcd42d9505370555fe78f59161e6dab2ee9bc35b1d8b1037&=&format=webp&quality=lossless&width=280&height=350"
        />
      </div>
    </div>
  );
};

export default KattiaDashboardComponent;
