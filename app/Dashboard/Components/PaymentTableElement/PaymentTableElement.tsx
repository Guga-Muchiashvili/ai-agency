import React from "react";
import { HiDotsVertical } from "react-icons/hi";

const PaymentTableElement = ({
  name,
  worker,
  status,
  date,
  amount,
  perc,
  total,
}: {
  name: string;
  worker: string;
  status: string;
  date: string;
  amount: string;
  perc: string;
  total: string;
}) => {
  return (
    <div className="w-full h-16 rounded-lg text-xl text-white flex justify-between items-center relative">
      <h1 className="hidden md:block w-[14%] text-center">{name}</h1>

      <div className="w-[25%] md:w-[14%] flex justify-center">
        <button
          className={`p-2 text-center ${
            status === "completed"
              ? "bg-green-600"
              : status === "hold"
              ? "bg-red-600"
              : "bg-blue-600"
          } rounded-md`}
        >
          {status}
        </button>
      </div>

      <h1 className="w-[25%] md:w-[14%] text-center">{worker}</h1>
      <h1 className="w-[25%] md:w-[14%] text-center">{date}</h1>
      <h1 className="hidden md:block w-[14%] text-center">{amount}$</h1>
      <h1 className="hidden md:block w-[14%] text-center">{perc}%</h1>
      <h1 className="w-[25%] md:w-[14%] text-center text-2xl text-green-400">
        {total}$
      </h1>
      <div className="relative group">
        <HiDotsVertical className="text-white cursor-pointer" />
        <span className="absolute left-6 top-1/2 transform -translate-y-1/2 scale-0 group-hover:scale-100 group-hover:opacity-100 bg-gray-700 text-white text-sm px-2 py-1 rounded-md transition-all duration-300 opacity-0">
          Edit
        </span>
      </div>
    </div>
  );
};

export default PaymentTableElement;
