"use client";
import React from "react";
import TodoCard from "./elements/TodoCardElement";

const TodoComponent = () => {
  const openModal = (todo: string) => {
    console.log(todo);
  };

  return (
    <div className="text-white w-[98vw] xl:w-[80vw] min-h-fit flex flex-col py-4 font-bebas h-full ">
      <div className="w-full flex justify-between px-8 h-2/3 pb-2">
        <div className=" h-full w-1/4 flex flex-col gap-3">
          <div className=" text-xl bg-[#DAA421] rounded-xl text-white py-3 text-center">
            TODO
          </div>
          <div className="w-full h-full flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            <div
              key={1}
              className="w-full bg-black border-[1px] border-white rounded-xl flex flex-col gap-3 p-4 cursor-pointer"
              style={{ borderLeft: `4px solid red` }}
              onClick={() => openModal("id")}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">vxodav temas</h3>
                <span
                  className="px-2 py-1 text-white text-xs rounded-lg"
                  style={{ backgroundColor: "red" }}
                >
                  Important
                </span>
              </div>
              <p className="text-sm text-gray-400">
                xoda dzmao movdivar da es tipi ras meubneba ici?
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>P3rsi</span>
                <span>05/03/2025</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{`Deadline: 10/03/2025`}</span>
              </div>
            </div>
            <TodoCard
              createdAt="25/02/4224"
              deadline="sadadsadw"
              description="sadwasd sajhdh lwak hsd;awj hdlkwaj"
              label="red"
              members={["hello", "skuchana"]}
              onClick={() => console.log("hello")}
              title="Best var"
            />
            <TodoCard
              createdAt="25/02/4224"
              deadline="sadadsadw"
              description="sadwasd sajhdh lwak hsd;awj hdlkwaj"
              label="red"
              members={["hello", "skuchana"]}
              onClick={() => console.log("hello")}
              title="Best var"
            />
            <TodoCard
              createdAt="25/02/4224"
              deadline="sadadsadw"
              description="sadwasd sajhdh lwak hsd;awj hdlkwaj"
              label="red"
              members={["hello", "skuchana"]}
              onClick={() => console.log("hello")}
              title="Best var"
            />
            <TodoCard
              createdAt="25/02/4224"
              deadline="sadadsadw"
              description="sadwasd sajhdh lwak hsd;awj hdlkwaj"
              label="red"
              members={["hello", "skuchana"]}
              onClick={() => console.log("hello")}
              title="Best var"
            />
          </div>
        </div>
        <div className=" h-full w-1/4 flex flex-col gap-3">
          <div className=" text-xl bg-[#DAA421] rounded-xl text-white py-3 text-center">
            Progress
          </div>
          <div className="w-full h-full flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            <TodoCard
              createdAt="25/02/4224"
              deadline="sadadsadw"
              description="sadwasd sajhdh lwak hsd;awj hdlkwaj"
              label="green"
              members={["hello", "skuchana"]}
              onClick={() => console.log("hello")}
              title="Best var"
            />
            <TodoCard
              createdAt="25/02/4224"
              deadline="sadadsadw"
              description="sadwasd sajhdh lwak hsd;awj hdlkwaj"
              label="green"
              members={["hello", "skuchana"]}
              onClick={() => console.log("hello")}
              title="Best var"
            />
          </div>
        </div>
        <div className=" h-full w-1/4 flex flex-col gap-3">
          <div className=" text-xl bg-[#DAA421] rounded-xl text-white py-3 text-center">
            Completed
          </div>
          <div className="w-full h-full flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            <TodoCard
              createdAt="25/02/4224"
              deadline="sadadsadw"
              description="sadwasd sajhdh lwak hsd;awj hdlkwaj"
              label="orange"
              members={["hello", "skuchana"]}
              onClick={() => console.log("hello")}
              title="Best var"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-1/3 p-8 flex flex-col gap-5 border-t-[1px] border-[#DAA421]">
        <h1 className="text-3xl">Reminder</h1>
        <div className="w-full h-full flex gap-4 overflow-x-auto hide-scrollbar">
          <TodoCard
            createdAt="25/02/4224"
            deadline="sadadsadw"
            description="sadwasd sajhdh lwak hsd;awj hdlkwaj"
            label="red"
            members={["hello", "skuchana"]}
            onClick={() => console.log("hello")}
            title="Best var"
          />
          <TodoCard
            createdAt="25/02/4224"
            deadline="sadadsadw"
            description="sadwasd sajhdh lwak hsd;awj hdlkwaj"
            label="red"
            members={["hello", "skuchana"]}
            onClick={() => console.log("hello")}
            title="Best var"
          />
          <TodoCard
            createdAt="25/02/4224"
            deadline="sadadsadw"
            description="sadwasd sajhdh lwak hsd;awj hdlkwaj"
            label="red"
            members={["hello", "skuchana"]}
            onClick={() => console.log("hello")}
            title="Best var"
          />
          <TodoCard
            createdAt="25/02/4224"
            deadline="sadadsadw"
            description="sadwasd sajhdh lwak hsd;awj hdlkwaj"
            label="red"
            members={["hello", "skuchana"]}
            onClick={() => console.log("hello")}
            title="Best var"
          />
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
