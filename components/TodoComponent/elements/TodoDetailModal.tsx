"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import useUpdateTodoType from "@/mutations/EditTodoMutation/EditTodoMutation";

interface TodoDetailsModalProps {
  data: {
    id?: string;
    title?: string;
    description?: string;
    createdAt?: string;
    deadline?: string;
    label?: string;
    workerNames?: string[];
    type?: string;
  };
  onClose: () => void;
}

const TodoDetailsModal: React.FC<TodoDetailsModalProps> = ({
  data,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { mutate: updateTodoType } = useUpdateTodoType();

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

  if (!data) return null;

  const handleUpdateType = () => {
    const newType = data.type === "Todo" ? "Progress" : "Completed";
    if (!data.id) {
      console.error("Todo ID is missing");
      return;
    }
    updateTodoType(
      { id: data.id, type: newType },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full relative border border-gray-300 dark:border-gray-700"
      >
        <button
          className="absolute top-4 right-4 text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          onClick={onClose}
        >
          <IoClose size={26} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-5">
          {data.title}
        </h2>
        <p className="text-lg text-gray-800 dark:text-gray-200 mb-5">
          {data.description}
        </p>

        <div className="space-y-4 text-gray-800 dark:text-gray-300">
          <p className="text-base">
            <span className="font-semibold text-gray-900 dark:text-white">
              🕒 Created At:
            </span>{" "}
            {data.createdAt}
          </p>
          <p className="text-base">
            <span className="font-semibold text-gray-900 dark:text-white">
              ⏳ Deadline:
            </span>{" "}
            {data.deadline}
          </p>
          <p className="flex items-center gap-2 text-base">
            <span className="font-semibold text-gray-900 dark:text-white">
              🏷️ Label:
            </span>
            <span
              className={`px-4 py-1 text-sm font-medium text-white rounded-full bg-gray-700`}
            >
              {data.label}
            </span>
          </p>
          <p className="text-base">
            <span className="font-semibold text-gray-900 dark:text-white">
              👥 Members:
            </span>{" "}
            {data.workerNames?.join(", ") || "No members assigned"}
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            className="px-5 py-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            onClick={handleUpdateType}
          >
            {data.type === "Todo" ? "Add to Progress" : "Completed"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TodoDetailsModal;
