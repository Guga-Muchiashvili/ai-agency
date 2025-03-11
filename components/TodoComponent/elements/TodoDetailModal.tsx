"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import useUpdateTodoType from "@/mutations/EditTodoMutation/EditTodoMutation";
import { useGetTodoById } from "@/queries/useGetTodoByIdQuery/useGetTodoByIdQuery";

interface TodoDetailsModalProps {
  onClose: () => void;
  id: string;
}

const TodoDetailsModal: React.FC<TodoDetailsModalProps> = ({ onClose, id }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { mutate: updateTodoType } = useUpdateTodoType();
  const { data: todoDetails } = useGetTodoById({ id });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!todoDetails) return null;

  const handleUpdateType = () => {
    const newType = todoDetails.type === "Todo" ? "Progress" : "Completed";
    if (!todoDetails.id) {
      console.error("Todo ID is missing");
      return;
    }
    updateTodoType(
      { id: todoDetails.id, type: newType },
      { onSuccess: () => onClose() }
    );
  };

  const color =
    todoDetails.label == "GoodToDo"
      ? "green"
      : todoDetails.label == "MustDo"
      ? "red"
      : "orange";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-lg flex justify-center items-center z-50">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl max-w-lg w-full relative border border-gray-700"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          onClick={onClose}
        >
          <IoClose size={26} />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold">{todoDetails.title}</h2>
          <p className="text-lg text-gray-300">{todoDetails.description}</p>

          <div className="w-full flex flex-wrap justify-center gap-6 text-gray-400">
            <div className="flex flex-col items-center">
              <span className="text-sm uppercase font-semibold">
                Created At
              </span>
              <span className="text-lg text-white">
                {todoDetails.createdAt}
              </span>
            </div>
            {todoDetails.label && (
              <div className="flex flex-col items-center">
                <span className="text-sm uppercase font-semibold">
                  Deadline
                </span>
                <span className="text-lg text-white">
                  {todoDetails.deadline}
                </span>
              </div>
            )}
            {todoDetails.label && (
              <div className="flex flex-col items-center">
                <span className="text-sm uppercase font-semibold">Label</span>
                <span
                  className="px-4 py-1 text-sm text-white rounded-full"
                  style={{ background: color }}
                >
                  {todoDetails.label}
                </span>
              </div>
            )}
            <div className="flex flex-col items-center">
              <span className="text-sm uppercase font-semibold">Members</span>
              <span className="text-lg text-white">
                {todoDetails.workerNames?.join(", ") || "No members"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-500 transition"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
            onClick={handleUpdateType}
          >
            {todoDetails.type === "Todo"
              ? "Move to Progress"
              : "Mark as Completed"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TodoDetailsModal;
