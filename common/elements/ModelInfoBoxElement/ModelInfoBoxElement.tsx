import React from "react";
import { IModelInfoBoxElementProps } from "./types";
import Image from "next/image";

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
    <div className="w-full text-center text-white h-full p-2 font-bebas">
      <Image
        src={img}
        alt="image"
        width={800}
        height={800}
        className="rounded-[100%] w-36 h-36 mx-auto mt-1"
      />
      <div className="w-full flex flex-col gap-3 text-left text-2xl mt-5">
        <h1>name : {name}</h1>
        <h1>age : {age}</h1>
        <h1>country : {country}</h1>
        <h1>date : {date}</h1>
        <h1 className="text-gray-200 text-lg">desc : {description}</h1>
      </div>
      <h1 className="text-3xl mt-6">Soc Media</h1>
      <div className="w-full flex flex-col gap-2 text-left text-2xl mt-5">
        <h1>telegram : {telegram}</h1>
        <h1>
          drive :{" "}
          <a href={drive} className="underline cursor-pointer">
            Link
          </a>
        </h1>
        <h1 className="text-2xl">
          instagram :{" "}
          <p className="text-lg text-gray-300 mt-2">
            {" "}
            email : {instagram.email}
          </p>
        </h1>
        <h1 className="text-lg text-gray-300 flex gap-1">
          password : <p className="">{instagram.password}</p>
        </h1>{" "}
      </div>
      <h1 className="text-3xl mt-6">Workers</h1>
      <div className="w-full flex flex-col gap-2 text-left text-2xl mt-5">
        {workers.map((item) => (
          <h1 key={item}>{item}</h1>
        ))}
      </div>
    </div>
  );
};

export default ModelInfoBoxElement;
