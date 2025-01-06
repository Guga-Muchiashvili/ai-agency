import React from "react";

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
    <div className="w-full h-16  rounded-lg text-xl text-white flex justify-between items-center ">
      <h1 className="w-[14%] text-center">{name}</h1>
      <div className="w-[14%] flex justify-center">
        <button
          className={`p-2 text-center text ${
            status == "completed"
              ? "bg-green-600"
              : status == "hold"
              ? "bg-red-600"
              : "bg-blue-600"
          } rounded-md`}
        >
          {status}
        </button>
      </div>
      <h1 className="w-[14%] text-center">{worker}</h1>
      <h1 className="w-[14%] text-center">{date}</h1>
      <h1 className="w-[14%] text-center">{amount}$</h1>
      <h1 className="w-[14%] text-center">{perc}%</h1>
      <h1 className="w-[14%] text-center text-2xl text-green-400">{total}$</h1>
    </div>
  );
};

export default PaymentTableElement;
