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
import { IoIosCloseCircle } from "react-icons/io";

const FionaaDashboardComponent = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filter, setfilter] = useState<"overall" | "last Month" | "last Week">(
    "overall"
  );
  const [showModal, setShowModal] = useState(false);

  const { data } = useGetModel({ name: "Fionna" });

  const { data: workers } = useGetWorkers();

  const workerList = transformLeaderboardData(workers, [
    { id: data?.id, name: data?.name },
  ])?.filter((item) => item.model == "Fionna");

  const labels = useChartLabels(filter);

  return (
    <div className="w-full h-fit flex ">
      {showModal && (
        <div className="fixed flex items-center justify-center w-full h-full top-0 left-0 bg-black bg-opacity-55 z-40">
          <div className="w-[35vw] h-[70vh] relative rounded-xl bg-white">
            <h1 className="text-black">Form</h1>
            <IoIosCloseCircle
              className="text-3xl text-black  absolute top-2 right-2 cursor-pointer"
              onClick={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
      <div className="w-full lg:w-3/4 flex hide-scrollbar h-fit gap-4 p-2 flex-col">
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
        <div className="w-full h-24 lg:h-fit xl:px-3 items-center gap-2  mt-2 xl:gap-6  flex">
          <OutputBoxElement index={1} title={`${filter}`} price="2,190$" />
          <OutputBoxElement index={2} title="Balance" price="1,542$" />
          <OutputBoxElement index={3} title="Hold" price="294$" />
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
        <div className="w-full h-fit font-bebas py-2 md:p-4">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-4xl text-white">Transactions</h1>
            <button
              className="px-3 py-1 bg-slate-100 text-ბლაცკ rounded-lg text-xl"
              onClick={() => setShowModal(true)}
            >
              Add Transaction
            </button>
          </div>
          <div className="w-full text-white flex mt-5 items-center justify-between text-xl h-12 border-b-[1px] border-white ">
            <h1 className="hidden md:block w-[14%] text-center">name</h1>
            <h1 className="w-[25%] m:w-[14%] text-center">status</h1>
            <h1 className="w-[25%] m:w-[14%] text-center">worker</h1>
            <h1 className="w-[25%] m:w-[14%] text-center">date</h1>
            <h1 className="hidden md:block w-[14%] text-center">Amount</h1>
            <h1 className="hidden md:block w-[14%] text-center">percentage</h1>
            <h1 className="w-[25%] m:w-[14%] text-center">Total</h1>
          </div>
          <div className="w-full flex flex-col gap-3 mt-6">
            <PaymentTableElement
              amount="1540"
              date="05/01/2025"
              name="chris"
              perc="60"
              status="hold"
              total="1524"
              worker="gega"
            />
            <PaymentTableElement
              amount="358"
              date="04/01/2025"
              name="chris"
              perc="60"
              status="hold"
              total="119"
              worker="gega"
            />
            <PaymentTableElement
              amount="394"
              date="05/01/2025"
              name="Sydney"
              perc="60"
              status="balance"
              total="376"
              worker="vano"
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:w-1/4 lg:block ">
        <ModelInfoBoxElement
          age="18"
          country="ukraine"
          description="sald wa;sdh wailu ds;ad hwopaiu dhs;adwah oigdd dsiaudd dush dd ausid usdihaiowud g hs;adwah oigdd dsiaudd dush dd ausid usdihaiowud g sdad wa;ui gha;iudg slady gwfaoudyfodidsgal dw"
          drive="https://drive.google.com/drive/folders/1S13m3Va9G85wHttFWWEv5LLGtf4ldbet?dmr=1&ec=wgc-drive-hero-goto"
          instagram={{ email: "fionaaxo1@gmail.com", password: "Unamusofuli1" }}
          name="Fiona"
          telegram="+995555002646"
          date="01/16/2006"
          workers={workerList}
          img="https://media.discordapp.net/attachments/1168089250995126363/1325896711251693588/image.png?ex=677d7509&is=677c2389&hm=7e1ca5d97ca4f36004251da73ec52b86d2fa638b7f612df255c149ea07eeb1cc&=&format=webp&quality=lossless&width=334&height=350"
        />
      </div>
    </div>
  );
};

export default FionaaDashboardComponent;
