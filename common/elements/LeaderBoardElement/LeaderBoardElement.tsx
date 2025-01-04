import Image from "next/image";
import React from "react";
import pfp from "../../../public/sicho.jpg";

const LeaderBoardElement = ({
  name,
  model,
  money,
}: {
  name: string;
  model: string;
  money: string;
}) => {
  return (
    <div className="w-full relative font-bebas h-20 p-2 shadow-sm cursor-pointer duration-700 hover:shadow-none hover:scale-105  rounded-lg">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2 justify-center h-full">
          <Image
            src={pfp.src}
            alt="pfp"
            height={50}
            width={50}
            className="rounded-full"
          ></Image>
          <h1 className="text-2xl">{name}</h1>
        </div>
        <h1 className="absolute right-2">model : {model}</h1>
      </div>
      <h1 className="text-3xl absolute bottom-2 right-3">{money}</h1>
    </div>
  );
};

export default LeaderBoardElement;
