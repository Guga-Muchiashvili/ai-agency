"use client";
import { routerLinks } from "@/common/constants/constants";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const NavBar = () => {
  const currentPath = usePathname();
  const router = useRouter();

  const handleClick = (item: string) => {
    if (item.toLowerCase() === "dashboard") {
      return router.push("/Dashboard");
    }
    router.push(`/Dashboard/${item}`);
  };

  return (
    <div className="w-[15vw] p-2 bg-black h-full font-bebas rounded-lg">
      <h1 className="w-full text-center text-4xl pl-2 h-32 flex items-center text-white">
        AiAgency
      </h1>
      <ul className="w-full text-white flex flex-col gap-7">
        {routerLinks.map((item) => (
          <li
            key={item}
            onClick={() => handleClick(item)}
            className={`w-full py-2 cursor-pointer ${
              currentPath === `/Dashboard` && item.toLowerCase() === "dashboard"
                ? "bg-slate-100 text-black"
                : currentPath === `/Dashboard/${item}`
                ? "bg-slate-100 text-black"
                : ""
            } hover:bg-slate-200 hover:text-black duration-700 ease-out rounded-lg px-3 text-2xl`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
