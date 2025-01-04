import Image from "next/image";
import React from "react";
import pfp from "../../../public/sicho.jpg";
import { motion } from "framer-motion";

const LeaderBoardElement = ({
  name,
  model,
  money,
  index,
}: {
  name: string;
  model?: string;
  money: number;
  index: number;
}) => {
  console.log("here");
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.2, delay: 0.2 * index, ease: "easeOut" }}
      className="w-full relative font-bebas h-20 p-2 shadow-sm cursor-pointer duration-700 hover:shadow-none hover:scale-105  rounded-lg"
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-3 justify-center h-full">
          <Image
            src={pfp.src}
            alt="pfp"
            height={50}
            width={50}
            className="rounded-full"
          ></Image>
          <div className="mt-2">
            <h1 className="">model : {model}</h1>
            <h1 className="text-2xl">{name}</h1>
          </div>
        </div>
      </div>
      <h1 className="text-3xl absolute bottom-1/2 translate-y-[50%] right-3">
        {money}$
      </h1>
    </motion.div>
  );
};

export default LeaderBoardElement;
