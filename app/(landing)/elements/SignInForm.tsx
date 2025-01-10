"use client";
import signIn from "@/actions/signIn/signInAction";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";

const SignInForm = () => {
  const [type, setType] = useState("password");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePassword()) return;

    const isSignedIn = signIn(password);

    if (!isSignedIn) {
      setError(true);
      return;
    }

    setPassword("");
    toast.success("Signed in", {
      description: "Signed in successfully",
    });

    router.push("/Dashboard");
  };

  return (
    <div className="w-4/5 md:w-1/2 lg:w-1/4 h-[260px] bg-black bg-opacity-0 rounded-xl flex flex-col items-center justify-between py-4">
      <h1 className="text-4xl font-bebas text-white">Enter Password</h1>
      <form onSubmit={submit} className="w-3/4 mt-2">
        <div className="relative">
          <input
            type={type}
            name="password"
            placeholder="Enter password"
            value={password}
            className={`text-sm bg-transparent border-b-[1px] sm:text-base py-3 w-full pl-2.5 sm:pl-2 md:pl-3 outline-none block ease-in-out pr-10 duration-300 ${
              error
                ? "border-b-red-500 text-red-500"
                : "border-b-white text-white"
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
          >
            {type === "password" ? (
              <FiEye
                className={`text-xl text-white ${
                  error ? "text-red-500" : "text-white"
                }`}
              />
            ) : (
              <FiEyeOff
                className={`text-xl text-white ${
                  error ? "text-red-500" : "text-white"
                }`}
              />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="bg-slate-100 w-full h-12 text-black rounded-md mt-4"
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
