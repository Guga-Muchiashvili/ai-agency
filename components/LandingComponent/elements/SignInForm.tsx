"use client";
import signIn from "@/actions/signIn/signInAction";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignInForm = () => {
  const [type, setType] = useState("password");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const submit = () => {
    signIn(password);
    setPassword("");
    router.push("dashboard");
  };

  return (
    <div className="w-1/4 h-[230px] bg-black bg-opacity-0 rounded-xl flex flex-col items-center justify-between py-4">
      <h1 className="text-4xl font-bebas text-white">Enter Password</h1>
      <div className="relative w-3/4 mt-2">
        <input
          type={type}
          name="password"
          placeholder="Enter password"
          className="text-sm bg-transparent border-b-[1px] text-white border-b-white sm:text-base py-3 w-full pl-2.5 sm:pl-2 md:pl-3 outline-none block ease-in-out pr-10 duration-300"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
        >
          {type === "password" ? (
            <FiEye className="text-xl text-white" />
          ) : (
            <FiEyeOff className="text-xl text-white" />
          )}
        </button>
      </div>
      <button
        onClick={() => submit()}
        className="bg-slate-100 w-3/4 h-12 text-black rounded-md"
      >
        Enter
      </button>
    </div>
  );
};

export default SignInForm;
