import React, { useState, useRef } from "react";
import { FiTrash } from "react-icons/fi";
import { toast } from "sonner";
import { useGetWorkerById } from "@/queries/useGetWorkerQueru/useGetWorkerQuery";
import { useChangeEarningStatusMutation } from "@/mutations/mutations";
import { deleteEarningByNames } from "@/api/api";
import { IPaymentTableElementProps } from "./types";

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
}: IPaymentTableElementProps) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { data } = useGetWorkerById({ id: worker });

  const { mutate: changeStatus } =
    useChangeEarningStatusMutation(refetchEarnings);

  const handleDelete = async () => {
    if (!id || !worker || !model) {
      alert("Missing required data to delete the transaction.");
      return;
    }

    try {
      const response = await deleteEarningByNames({
        earningId: id,
        workerId: worker,
        modelName: model,
      });

      if (response?.success) {
        toast.success("Transaction removed", {
          description: response.message,
        });
        refetchEarnings();
        setShowModal(false);
      } else {
        throw new Error(response?.message || "Failed to delete the earning.");
      }
    } catch (error) {
      toast.error("Failed to delete transaction", {
        description: "An error occurred while deleting the earning.",
      });
      console.error(error);
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
        <h1 className="w-[25%] md:w-[14%] text-center text-2xl text-green-400 pr-1">
          {total}$
        </h1>
        <div className="absolute right-[-3px] flex group">
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
