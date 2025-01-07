import React from "react";
import { IModelInfoBoxElementProps } from "./types";
import Image from "next/image";
import LeaderBoardElement from "../LeaderBoardElement/LeaderBoardElement";
import { motion } from "framer-motion";

const ModelInfoBoxElement = ({
  img,
  description,
  name,
  age,
  country,
  drive,
  telegram,
  instagram,
  date,
  workers,
}: IModelInfoBoxElementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full text-center text-white h-full p-2 font-bebas"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="rounded-[100%] w-28 h-28 mx-auto mt-1"
      >
        <Image
          src={
            img ||
            "https://www.google.com/search?q=default+image+pfp&oq=default+image+pfp&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQLhhA0gEIMzMxOWowajGoAgCwAgA&sourceid=chrome&ie=UTF-8#vhid=JNzXO3Fe39JcaM&vssid=_Oyt9Z8qDMPqGkdUPldr0iQo_40"
          }
          alt="image"
          width={800}
          height={800}
          className="rounded-[100%] w-28 h-28 mx-auto mt-1"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex flex-col gap-3 text-left text-xl mt-5"
      >
        <h1>name : {name}</h1>
        <h1>age : {age}</h1>
        <h1>country : {country}</h1>
        <h1>date : {date}</h1>
        <h1 className="text-gray-300 text-sm">desc : {description}</h1>
      </motion.div>

      <motion.h1
        className="text-3xl mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Soc Media
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full flex flex-col gap-2 text-left text-xl mt-5"
      >
        <h1>telegram : {telegram}</h1>
        <h1>
          drive :{" "}
          <a
            href={drive}
            className="underline text-xl text-gray-200 cursor-pointer"
          >
            Link
          </a>
        </h1>
        <h1 className="text-xl">
          instagram :{" "}
          <p className="text-lg text-gray-300 mt-2">
            email : {instagram?.email}
          </p>
        </h1>
        <h1 className="text-lg text-gray-300 flex gap-1">
          password : <p className="">{instagram?.password}</p>
        </h1>
      </motion.div>

      <motion.h1
        className="text-3xl mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Workers
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full flex flex-col gap-2 text-left text-2xl mt-5"
      >
        {workers?.map((item) => (
          <LeaderBoardElement
            index={1}
            name={item.name}
            img={item.img}
            money={item.profit}
            key={item.id}
            model={name}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ModelInfoBoxElement;
