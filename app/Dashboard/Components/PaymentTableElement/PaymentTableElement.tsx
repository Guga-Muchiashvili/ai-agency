import { deleteEarningByNames } from "@/api/api";
import { useGetWorkerById } from "@/queries/useGetWorkerQueru/useGetWorkerQuery";
import { useMutation } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import { FiTrash } from "react-icons/fi";

type DeleteEarningMutationVariables = {
  earningId: string;
  workerId: string | undefined;
  modelName: string | undefined;
};

type DeleteEarningMutationResponse = {
  success: boolean;
  message: string;
};

const PaymentTableElement = ({
  name,
  worker,
  status,
  date,
  amount,
  perc,
  total,
  id,
  model,
  refetchEarnings,
}: {
  name: string;
  worker: string;
  status: string;
  date: string;
  amount: number;
  perc: string;
  id: string;
  total: string;
  model: string | undefined;
  refetchEarnings: () => void;
}) => {
  const { data } = useGetWorkerById({ id: worker });

  const { mutate: deleteTransaction } = useMutation<
    DeleteEarningMutationResponse,
    Error,
    DeleteEarningMutationVariables
  >({
    mutationFn: deleteEarningByNames,
    onSuccess: () => {
      setShowModal(false);
      refetchEarnings();
    },
    onError: (error) => {
      alert("Failed to delete transaction");
      setShowModal(false);
      throw error;
    },
  });

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        earningId: id,
        workerId: worker,
        modelName: model,
      });
    } catch (error) {
      alert("Failed to delete transaction");
      throw error;
    }
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  return (
    <div>
      <div className="w-full h-16 rounded-lg text-xl text-white flex justify-between items-center relative">
        <h1 className="hidden md:block w-[14%] text-center">{name}</h1>

        <div className="w-[25%] md:w-[14%] flex justify-center">
          <button
            className={`p-2 text-center ${
              status === "completed"
                ? "bg-green-600"
                : status === "hold"
                ? "bg-red-600"
                : "bg-blue-600"
            } rounded-md`}
          >
            {status}
          </button>
        </div>

        <h1 className="w-[25%] md:w-[14%] text-center">
          {data && data[0].name}
        </h1>
        <h1 className="w-[25%] md:w-[14%] text-center">{date}</h1>
        <h1 className="hidden md:block w-[14%] text-center">{amount}$</h1>
        <h1 className="hidden md:block w-[14%] text-center">{perc}%</h1>
        <h1 className="w-[25%] md:w-[14%] text-center text-2xl text-green-400">
          {total}$
        </h1>
        <div className="absolute right-[-1px] flex group">
          <FiTrash
            className="text-white cursor-pointer"
            onClick={() => setShowModal(true)}
          />
          <span className="absolute left-6 top-1/2 transform -translate-y-1/2 scale-0 group-hover:scale-100 group-hover:opacity-100 bg-gray-700 text-white text-sm px-2 py-1 rounded-md transition-all duration-300 opacity-0 z-10">
            Edit
          </span>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black z-30 bg-opacity-50 flex justify-center items-center"
          onClick={handleClickOutside}
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl text-gray-800">
              Are you sure you want to delete?
            </h2>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentTableElement;
