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

const ElenkaDashboardComponent = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filter, setfilter] = useState<"overall" | "last Month" | "last Week">(
    "overall"
  );

  const labels = useChartLabels(filter);

  return (
    <div className="w-full h-full flex ">
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
        <div className="w-full h-24 lg:h-64 xl:px-3 items-center gap-2 mb-4 mt-2 xl:gap-6  flex">
          <OutputBoxElement index={1} title={`${filter}`} price="980$" />
          <OutputBoxElement index={2} title="Balance" price="542$" />
          <OutputBoxElement index={3} title="Hold" price="344$" />
        </div>
        <ChartTableElement
          labels={labels}
          dataset={[
            {
              label: "Sichinava",
              data: [120, 50, 190, 264, 241],
              borderColor: "white",
              backgroundColor: "white",
            },
            {
              label: "kakasha",
              data: [10, 150, 120, 564, 21],
              borderColor: "#DAA520",
              backgroundColor: "#DAA520",
            },
          ]}
        />
        <div className="w-full h-[90vh] font-bebas p-4">
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
      <div className="w-1/4 ">
        <ModelInfoBoxElement
          age="18"
          country="ukraine"
          description="sald wa;sdh wailu ds;ad hwopaiu dhs;adwah oigdd dsiaudd dush dd ausid usdihaiowud g hs;adwah oigdd dsiaudd dush dd ausid usdihaiowud g sdad wa;ui gha;iudg slady gwfaoudyfodidsgal dw"
          drive="https://drive.google.com/drive/folders/1L6-yfZQnEUmwjoEI5n-GvKzVpxzZaJAG?dmr=1&ec=wgc-drive-hero-goto"
          instagram={{ email: "elenkaxo1@gmail.com", password: "Unamusofuli1" }}
          name="Elenka"
          telegram="+995555002646"
          date="11/11/2006"
          workers={["sichinava", "Kakasha"]}
          img="https://media.discordapp.net/attachments/1168089250995126363/1325762719718182922/image.png?ex=677cf83f&is=677ba6bf&hm=f3bd498a247d792c315c6867f57fdc863f370a560cf5bfc43318b10cba1e4d70&=&format=webp&quality=lossless"
        />
      </div>
    </div>
  );
};

export default ElenkaDashboardComponent;
