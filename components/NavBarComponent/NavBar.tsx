"use client";
import { routerLinks } from "@/common/constants/constants";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

const NavBar = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const [navBar, setNavBar] = useState(false);

  const handleClick = (item: string) => {
    if (item.toLowerCase() === "dashboard") {
      return router.push("/Dashboard");
    }
    router.push(`/Dashboard/${item}`);
  };

  useEffect(() => {
    setNavBar(false);
  }, [currentPath]);

  return (
    <>
      {navBar && (
        <div className="fixed w-4/6 bg-opacity-95 bg-black top-0 z-20 h-screen left-0">
          <IoIosCloseCircle
            className="text-3xl text-white absolute top-4 left-3"
            onClick={() => setNavBar(false)}
          />
          <ul className="w-full mt-16 text-white flex flex-col p-2 font-bebas gap-7">
            {routerLinks.map((item) => (
              <li
                key={item}
                onClick={() => handleClick(item)}
                className={`w-full py-2 cursor-pointer ${
                  currentPath === `/Dashboard` &&
                  item.toLowerCase() === "dashboard"
                    ? "bg-slate-100 text-black"
                    : currentPath === `/Dashboard/${item}`
                    ? "bg-slate-100 text-black"
                    : ""
                } hover:bg-slate-200 hover:text-black duration-700 ease-out rounded-lg px-3 text-xl`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="xl:hidden block">
        <IoMenu
          onClick={() => setNavBar(true)}
          className="absolute text-white z-10 top-4 text-3xl left-3 cursor-pointer"
        />
      </div>
      <div className="w-[17vw] hidden xl:block p-2 bg-black h-full font-bebas rounded-lg">
        <h1 className="w-full text-center text-4xl pl-2 h-32 flex items-center text-white">
          Model Agency
        </h1>
        <ul className="w-full text-white flex flex-col gap-7">
          {routerLinks.map((item) => (
            <li
              key={item}
              onClick={() => handleClick(item)}
              className={`w-full py-2 cursor-pointer ${
                currentPath === `/Dashboard` &&
                item.toLowerCase() === "dashboard"
                  ? "bg-slate-100 text-black"
                  : currentPath === `/Dashboard/${item}`
                  ? "bg-slate-100 text-black"
                  : ""
              } hover:bg-slate-200 hover:text-black duration-700 ease-out rounded-lg px-3 text-sm md:text-2xl`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
