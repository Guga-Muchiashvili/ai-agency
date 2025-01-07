"use client";
import ModelInfoBoxElement from "@/app/Dashboard/Components/ModelInfoBoxElement/ModelInfoBoxElement";
import React, { useEffect, useState } from "react";
import ChartTableElement from "../../app/Dashboard/Components/ChartTableElement/ChartTableElement";
import { timePeriods } from "@/common/constants/constants";
import { motion } from "framer-motion";
import { IoFilterSharp } from "react-icons/io5";
import useChartLabels from "@/common/hooks/useChartLabel";
import OutputBoxElement from "@/app/Dashboard/Components/OutputBoxElement/OutputBoxElement";
import PaymentTableElement from "@/app/Dashboard/Components/PaymentTableElement/PaymentTableElement";
import { transformLeaderboardData } from "../../common/actions/transformData/transformData";

import { IModelDashboardProps } from "./types";
import PaymentModalElement from "@/app/Dashboard/Components/PaymentModalElement/PaymentModalElement";

const ModelDashboardElement = ({ data, workers }: IModelDashboardProps) => {
  const [showFilter, setShowFilter] = useState(true);
  const [filter, setfilter] = useState<"overall" | "last Month" | "last Week">(
    "overall"
  );
  const [showModal, setShowModal] = useState(false);

  const workerList = transformLeaderboardData(workers, [
    { id: data?.id, name: data?.name },
  ])?.filter((item) => item.model == data?.name);

  const workersFormData = workerList?.map((item) => item.name);

  const labels = useChartLabels(filter);

  const CloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <div className="w-full h-full flex ">
      {showModal && (
        <div className="fixed flex items-center justify-center w-full h-full top-0 left-0 bg-black bg-opacity-55 z-40">
          <PaymentModalElement
            workers={workersFormData}
            changeModal={CloseModal}
          />
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
        <div className="w-full h-24 lg:h-fit xl:px-3 items-center gap-2 mt-2 xl:gap-6  flex">
          <OutputBoxElement index={1} title={`${filter}`} price="980$" />
          <OutputBoxElement index={2} title="Balance" price="542$" />
          <OutputBoxElement index={3} title="Hold" price="344$" />
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
              amount="540"
              date="05/01/2025"
              name="manuel"
              perc="60"
              status="completed"
              total="524"
              worker="sichinava"
            />
            <PaymentTableElement
              amount="128"
              date="04/01/2025"
              name="IAI"
              perc="60"
              status="hold"
              total="119"
              worker="sichinava"
            />
            <PaymentTableElement
              amount="394"
              date="05/01/2025"
              name="Sydney"
              perc="60"
              status="balance"
              total="376"
              worker="Kakasha"
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:w-1/4 lg:block ">
        <ModelInfoBoxElement
          age={data?.age}
          country={data?.country}
          description={data?.description}
          drive={data?.drive}
          instagram={{ email: data?.email, password: data?.password }}
          name={data?.name}
          telegram={data?.telegram}
          date={data?.telegram}
          workers={workerList}
          img={data?.image}
        />
      </div>
    </div>
  );
};

export default ModelDashboardElement;
