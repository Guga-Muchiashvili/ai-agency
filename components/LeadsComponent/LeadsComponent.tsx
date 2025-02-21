"use client";

import LeadFilterElement from "@/app/Dashboard/Components/LeadFilterElement/LeadFilterElement";
import { useGetModels } from "@/queries/useGetModelsQuery/useGetModelsQuery";
import { useGetWorkers } from "@/queries/useGetWorkersQuery/useGetWorkersQuert";
import { FaArrowRight } from "react-icons/fa";

import Image from "next/image";
import React from "react";

const LeadsComponent = () => {
  const onChange = () => {
    console.log("hello");
  };

  const models = useGetModels();
  const workers = useGetWorkers();

  console.log(workers.data);

  return (
    <div className="text-white w-[98vw] xl:w-[80vw] min-h-fit flex flex-col gap-3 py-4 font-bebas">
      <LeadFilterElement
        onModelChange={onChange}
        models={models.data}
        workers={workers.data}
      />
      <div className="flex flex-wrap p-3 gap-7 justify-center">
        <div className="w-full md:w-[45%] lg:w-[30%] h-52 shadow-sm shadow-white rounded-lg p-2 relative">
          <div className="w-3 h-3 absolute rounded-full bg-red-600 top-2 right-2"></div>
          <div className="absolute rounded-full bg-white text-black bottom-2 flex gap-2 items-center left-2 w-fit px-5">
            <div className="w-3 h-3  rounded-full bg-green-600"></div>
            <h1>Active</h1>
          </div>
          <div className="absolute bottom-2 right-2 text-xl bg-white p-2 text-black rounded-full cursor-pointer">
            <FaArrowRight />
          </div>
          <div className="w-full flex gap-3">
            <Image
              alt="lead"
              src={
                "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
              }
              width={332}
              height={332}
              className="rounded-full w-16 h-16"
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl">Manuel (36)</h1>
              <div className="flex gap-3 items-center">
                <div className="bg-white text-black px-3 py-1 rounded-xl">
                  Elenka
                </div>
                <div className="bg-white text-black px-3 py-1 rounded-xl">
                  Fionna
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 mt-3 text-xl">
            <h1>Worker : Admin</h1>
            <h1 className="text-sm text-gray-400">
              sadwa hsbdkajh dgwlakhsjgdlwka ughdlskah dgwlak dsglak dhjgwal
              hkdsbdd dlsayhdghilaw dsh d
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsComponent;
