"use client";
import React from "react";
import { motion } from "framer-motion";
import { IOutputBoxElementProps } from "./types";

const OutputBoxElement = ({ title, price, index }: IOutputBoxElementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.5, delay: 0.2 * index, ease: "easeIn" }}
      className="!w-[45%] p-1 py-2 flex flex-col shadow-sm hover:scale-105 hover:shadow-lg cursor-pointer duration-700 shadow-white items-center justify-between text-center font-bebas h-16 md:h-20 lg:h-40 text-white rounded-lg "
    >
      <h1 className="textlg md:text-xl">{title}</h1>
      <h1 className="text-xl md:text-2xl lg:text-6xl">{price}</h1>
      <div className="w-full h-7"></div>
    </motion.div>
  );
};

export default OutputBoxElement;
