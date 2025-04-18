import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { IleaderboardElementProps } from "./types";

const LeaderBoardElement = ({
  name,
  model,
  money,
  index,
  img,
}: IleaderboardElementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.2, delay: 0.2 * index, ease: "easeOut" }}
      className="w-full relative font-bebas h-12 lg:h-20 p-2 shadow-sm cursor-pointer duration-700 hover:shadow-none hover:scale-105  rounded-lg"
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-3 justify-center h-full">
          <h1 className="text-xl lg:text-2xl">{index + 1}</h1>
          <Image
            src={img || null}
            alt="pfp"
            height={50}
            width={50}
            className="rounded-full w-11 h-11 "
          ></Image>
          <div className="mt-2">
            <h1 className="text-sm lg:text-md">model : {model}</h1>
            <h1 className="text-md lg:text-lg">{name}</h1>
          </div>
        </div>
      </div>
      <h1 className="text-xl lg:text-2xl absolute bottom-1/2 translate-y-[50%] right-3">
        {money}$
      </h1>
    </motion.div>
  );
};

export default LeaderBoardElement;
