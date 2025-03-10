"use client";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { useGetEarning } from "@/queries/useGetEarningQuery/useGetEarningQuery";
import { IModelDashboardProps } from "./types";
import { useGetModelDashboard } from "@/queries/useGetModelDashboardQuery/useGetModelDashboardQuery";
import { transformLeaderboardData } from "../../common/actions/transformData/transformData";
import React, { useEffect, useState } from "react";
import OutputBoxElement from "@/app/Dashboard/Components/OutputBoxElement/OutputBoxElement";
import ChartTableElement from "../../app/Dashboard/Components/ChartTableElement/ChartTableElement";
import ModelInfoBoxElement from "@/app/Dashboard/Components/ModelInfoBoxElement/ModelInfoBoxElement";
import PaymentTableElement from "@/app/Dashboard/Components/PaymentTableElement/PaymentTableElement";
import PaymentModalElement from "@/app/Dashboard/Components/PaymentModalElement/PaymentModalElement";
import {
  ePaypal,
  fPaypal,
  kPaypal,
  timePeriods,
} from "@/common/constants/constants";
import { useGetWorkersByModel } from "@/queries/useGetWorkersByModel/useGetWorkersByModel";

const ModelDashboardElement = ({ data }: IModelDashboardProps) => {
  const [showFilter, setShowFilter] = useState(true);
  const [filter, setfilter] = useState<"overall" | "last Month" | "last Week">(
    "overall"
  );
  const [showModal, setShowModal] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);

  const { data: DashboardData, refetch } = useGetModelDashboard({
    name: data?.name,
    filter,
  });

  const { data: earnings, refetch: earningData } = useGetEarning({
    id: data?.id,
    filter,
  });

  const { data: WorkersData, refetch: workersRefetch } = useGetWorkersByModel(
    data?.id
  );

  const Refetch = () => {
    refetch();
    workersRefetch();
    earningData();
  };

  const workerList = transformLeaderboardData(WorkersData, [
    { id: data?.id, name: data?.name },
  ])?.filter((item) => item.model == data?.name && item.name !== "Admin");

  const CloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal || showModalInfo) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal, showModalInfo]);

  const chartData = (earnings?.chartData || []).map((item, i) => ({
    label: item.workerName,
    data: item.earnings,
    borderColor: i == 0 ? "white" : i == 1 ? "#DAA520" : "#9F2B68",
    backgroundColor: i == 0 ? "white" : i == 1 ? "#DAA520" : "#9F2B68",
  }));

  return (
    <div className="w-full h-full flex">
      <div className="fixed w-10 h-10 bottom-3 flex items-center justify-center right-3 z-[1000] rounded-full bg-white lg:hidden">
        {showModalInfo ? (
          <FaArrowRight
            className="text-xl"
            onClick={() => setShowModalInfo(false)}
          />
        ) : (
          <FaArrowLeft
            className="text-xl"
            onClick={() => setShowModalInfo(true)}
          />
        )}
      </div>
      {showModalInfo && (
        <div className="modal-overlay">
          <div className="scrollable-modal">
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
              paypal={
                data?.name === "Elenka"
                  ? ePaypal
                  : data?.name === "Fionna"
                  ? fPaypal
                  : kPaypal
              }
            />
          </div>
        </div>
      )}

      <Toaster />
      {showModal && (
        <div className="fixed flex items-center justify-center w-full h-full top-0 left-0 bg-black bg-opacity-55 z-50">
          <PaymentModalElement
            workers={workerList}
            changeModal={CloseModal}
            id={data?.id}
            refetch={() => Refetch()}
          />
        </div>
      )}
      <div className="w-[95vw] lg:w-full flex hide-scrollbar h-fit gap-4 p-2 flex-col">
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
          <OutputBoxElement
            index={1}
            title={`${filter}`}
            price={`${DashboardData?.formattedTotal || 0}$`}
          />
          <OutputBoxElement
            index={2}
            title="Balance"
            price={`${DashboardData?.formattedBalance || 0}$`}
          />
          <OutputBoxElement
            index={3}
            title="Hold"
            price={`${DashboardData?.formattedHold || 0}$`}
          />
        </div>
        <div className="w-full h-[50vh]">
          <ChartTableElement labels={earnings?.labels} dataset={chartData} />
        </div>
        <div className="w-full h-fit font-bebas py-2 md:p-4">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-4xl text-white">Transactions</h1>
            <button
              className="px-3 py-1 bg-slate-100 rounded-lg text-xl"
              onClick={() => setShowModal(true)}
            >
              Add Transaction
            </button>
          </div>
          <div className="w-full text-white flex mt-5 items-center justify-between text-xl h-12 border-b-[1px] border-white ">
            <h1 className="hidden md:block w-[14%] text-center">name</h1>
            <h1 className="w-[25%] md:w-[14%] text-center">status</h1>
            <h1 className="w-[25%] md:w-[14%] text-center">worker</h1>
            <h1 className="w-[25%] md:w-[14%] text-center">date</h1>
            <h1 className="hidden md:block w-[14%] text-center">Amount</h1>
            <h1 className="hidden md:block w-[14%] text-center">percentage</h1>
            <h1 className="w-[25%] md:w-[14%] text-center">Total</h1>
          </div>
          <div className="w-full flex flex-col gap-12 mt-6 overflow-scroll hide-scrollbar h-[30vh]">
            {earnings?.earnings.map((item) => (
              <PaymentTableElement
                refetchEarnings={Refetch}
                model={data?.name}
                id={item.id}
                key={item.id}
                amount={item.amount}
                date={item.createdAt}
                name={item.lead}
                perc={item.percentage}
                status={item.status}
                total={item.total}
                worker={item.workerId}
              />
            )) || []}
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
          paypal={
            data?.name == "Elenka"
              ? ePaypal
              : data?.name == "Fionna"
              ? fPaypal
              : kPaypal
          }
        />
      </div>
    </div>
  );
};

export default ModelDashboardElement;
