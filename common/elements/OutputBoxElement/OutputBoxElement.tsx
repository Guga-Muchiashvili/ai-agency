"use client";
import React from "react";

const OutputBoxElement = ({
  title,
  price,
}: {
  title: string;
  price: string;
}) => {
  return (
    <div className="!w-1/3 p-1 py-2 flex flex-col shadow-sm hover:scale-105 hover:shadow-lg cursor-pointer duration-700 shadow-white items-center justify-between text-center font-bebas h-40 text-white rounded-lg ">
      <h1 className="text-xl">{title}</h1>
      <h1 className="text-6xl">{price}</h1>
      <div className="w-full h-7"></div>
    </div>
  );
};

export default OutputBoxElement;
