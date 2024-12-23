"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignInForm = () => {
  const [type, setType] = useState("password");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  console.log(password);

  return (
    <div className="w-1/4 h-[430px] bg-slate-400 rounded-xl flex flex-col items-center justify-between py-4">
      <h1 className="text-4xl font-bebas text-white">Enter Password</h1>
      <Image
        src={"https://www.svgrepo.com/show/506724/lock.svg"}
        alt="image"
        width={150}
        height={150}
        className="bg-slate-500 mb-3 p-5 rounded-full"
      ></Image>
      <div className="relative w-2/3 mt-2">
        <input
          type={type}
          name="password"
          placeholder="Enter password"
          className="text-sm sm:text-base py-3 sm:py-4 md:py-6 w-full pl-2.5 sm:pl-3 md:pl-5 outline-none block ease-in-out rounded-md pr-10 border-2 border-newBorderC bg-[#F5F5F5] sm:h-[5px] focus:bg-white duration-300 focus:border-secondary"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
        >
          {type === "password" ? (
            <FiEye className="text-xl" />
          ) : (
            <FiEyeOff className="text-xl" />
          )}
        </button>
      </div>
      <button className="bg-slate-500 w-2/3 h-12 text-white rounded-md">
        Enter
      </button>
    </div>
  );
};

export default SignInForm;
