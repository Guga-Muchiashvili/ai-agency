"use client";
import { ILead } from "@/common/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight, FaTrashAlt } from "react-icons/fa";

const LeadCardComponent = ({
  item,
  handleDelete,
}: {
  item: ILead;
  handleDelete: (leadId: string) => void;
}) => {
  const route = useRouter();
  return (
    <div className="w-full md:w-[45%] lg:w-[30%] h-52 shadow-sm shadow-white rounded-lg p-2 relative">
      {!item.seen && (
        <div className="w-3 h-3 absolute rounded-full bg-red-600 top-2 right-14"></div>
      )}
      <div className="absolute rounded-full bg-white text-black bottom-2 flex gap-2 items-center left-2 w-fit px-5">
        <div
          className={`w-3 h-3 rounded-full ${
            item.active ? "bg-green-600" : "bg-gray-600"
          }`}
        ></div>
        <h1>{item.active ? "Active" : "Inactive"}</h1>
      </div>
      <div
        className="absolute bottom-2 right-2 text-xl bg-white p-2 text-black rounded-full cursor-pointer"
        onClick={() => route.push(`Leads/${item.id}`)}
      >
        <FaArrowRight />
      </div>
      <button
        onClick={() => handleDelete(item.id)}
        className="absolute top-2 right-2 text-xl bg-red-600 p-2 text-white rounded-full hover:bg-red-800"
      >
        <FaTrashAlt />
      </button>
      <div className="w-full flex gap-3">
        <Image
          alt="lead"
          src={item.img}
          width={332}
          height={332}
          className="rounded-full w-16 h-16"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">{item.name} (36)</h1>
          <div className="flex gap-3 items-center">
            {item.modelId.map((item) => (
              <div
                className="bg-white text-black px-3 py-1 rounded-xl"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-1 mt-3 text-xl">
        <h1>Worker : {item.workerId}</h1>
        <h1 className="text-sm text-gray-400">{item.description}</h1>
      </div>
    </div>
  );
};

export default LeadCardComponent;
