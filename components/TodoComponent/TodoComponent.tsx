"use client";
import React from "react";

const TodoComponent = () => {
  return (
    <div className="text-white w-[98vw] xl:w-[80vw] min-h-fit flex flex-col py-4 font-bebas h-full ">
      <div className="w-full flex justify-between px-8 h-2/3 pb-2">
        <div className=" h-full w-1/4 flex flex-col gap-3">
          <div className=" text-xl bg-[#DAA421] rounded-xl text-white py-3 text-center">
            TODO
          </div>
          <div className="w-full h-full flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
          </div>
        </div>
        <div className=" h-full w-1/4 flex flex-col gap-3">
          <div className=" text-xl bg-[#DAA421] rounded-xl text-white py-3 text-center">
            Progress
          </div>
          <div className="w-full h-full flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
          </div>
        </div>
        <div className=" h-full w-1/4 flex flex-col gap-3">
          <div className=" text-xl bg-[#DAA421] rounded-xl text-white py-3 text-center">
            Completed
          </div>
          <div className="w-full h-full flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
            <div className="w-full h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-1/3 p-8 flex flex-col gap-5 border-t-[1px] border-[#DAA421]">
        <h1 className="text-3xl">Reminder</h1>
        <div className="w-full h-full flex gap-2 overflow-x-auto hide-scrollbar">
          <div className="w-96 h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
          <div className="w-96 h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
          <div className="w-96 h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
          <div className="w-96 h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
          <div className="w-96 h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
          <div className="w-96 h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
          <div className="w-96 h-28 rounded-xl bg-black border-[1px] border-white flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
