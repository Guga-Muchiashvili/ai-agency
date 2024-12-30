import React from "react";

const NavBar = () => {
  return (
    <div className="w-[15vw] p-2 bg-black h-full font-bebas  rounded-lg">
      <h1 className="w-full text-center text-4xl pl-2 h-32 flex items-center text-white">
        AiAgency
      </h1>
      <ul className="w-full text-white flex flex-col gap-7">
        <li className="w-full py-2 cursor-pointer bg-slate-100 text-black  hover:bg-slate-200 hover:text-black duration-700 ease-out rounded-lg px-3 text-2xl">
          Dashboard
        </li>
        <li className="w-full py-2 cursor-pointer rounded-lg px-3 hover:bg-slate-200 hover:text-black duration-700 ease-out text-2xl">
          Elenka
        </li>
        <li className="w-full py-2 cursor-pointer rounded-lg px-3 hover:bg-slate-200 hover:text-black duration-700 ease-out text-2xl">
          Fionna
        </li>
        <li className="w-full py-2 cursor-pointer rounded-lg px-3 hover:bg-slate-200 hover:text-black duration-700 ease-out text-2xl">
          Katte
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
