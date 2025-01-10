import { useMutation } from "@tanstack/react-query";
import { changeEarningStatus } from "@/api/api";
import { FiTrash } from "react-icons/fi";
import { toast } from "sonner";
import React, { useState, useRef } from "react";
import { useGetWorkerById } from "@/queries/useGetWorkerQueru/useGetWorkerQuery";

type ChangeStatusMutationVariables = {
  earningId: string;
  newStatus: string;
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
  name?: string;
  worker?: string;
  status?: string;
  date?: string;
  amount?: number;
  perc?: string;
  id?: string;
  total?: string;
  model?: string | undefined;
  refetchEarnings: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { data } = useGetWorkerById({ id: worker });

  const { mutate: changeStatus } = useMutation<
    {
      status: string;
      amount: number;
      total: string;
      id: string;
      workerId: string;
      createdAt: string;
      lead: string;
      modelId: string;
      percentage: string;
    },
    Error,
    ChangeStatusMutationVariables
  >({
    mutationFn: changeEarningStatus,
    onSuccess: () => {
      refetchEarnings();
      toast.success("Status updated successfully", {
        description: "The earning status was updated.",
      });
    },
    onError: (error) => {
      alert("Failed to update status");
      throw error;
    },
  });

  const handleDelete = async () => {
    try {
      toast.success("Transaction removed", {
        description: "Your transaction was removed.",
      });
      refetchEarnings();
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

  const handleStatusChange = (newStatus: string) => {
    if (id && worker && model) {
      changeStatus({
        earningId: id,
        newStatus: newStatus,
      });
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
                : status === "balance"
                ? "bg-yellow-600"
                : "bg-blue-600"
            } rounded-md`}
            onClick={() => {
              if (status === "completed") {
                handleStatusChange("hold");
              } else if (status === "hold") {
                handleStatusChange("balance");
              } else if (status === "balance") {
                handleStatusChange("completed");
              } else {
                handleStatusChange("balance");
              }
            }}
          >
            {status === "completed"
              ? "Completed"
              : status === "hold"
              ? "Hold"
              : "Balance"}
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
