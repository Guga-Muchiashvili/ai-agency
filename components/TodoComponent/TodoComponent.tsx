"use client";
import React, { useState } from "react";
import TodoCard from "./elements/TodoCardElement";
import { BsThreeDotsVertical } from "react-icons/bs";
import TodoModal from "./elements/ModalElement";
import { useGetTodos } from "@/queries/useGetTodosQuery/useGetTodosQuery";
import { useGetTodoById } from "@/queries/useGetTodoByIdQuery/useGetTodoByIdQuery";
import TodoDetailsModal from "./elements/TodoDetailModal";
import useDeleteTodo from "@/mutations/DeleteTodoMutation/DeleteTodoMutation";

const TodoComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<string | undefined>("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [todoIdToDelete, setTodoIdToDelete] = useState<string | null>(null);

  const { data: todoData } = useGetTodos();
  const { data: todoDetails, refetch } = useGetTodoById({ id: selectedTodoId });
  const { mutate: deleteTodo } = useDeleteTodo();

  const openTodoDetailsModal = (todoId: string) => {
    setSelectedTodoId(todoId);
    refetch();
  };

  const handleDeleteClick = (todoId: string) => {
    setTodoIdToDelete(todoId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTodo = () => {
    if (todoIdToDelete) {
      deleteTodo(todoIdToDelete);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="text-white w-[98vw] xl:w-[80vw] min-h-fit flex flex-row py-4 font-bebas h-full md:flex-col">
      {isModalOpen && <TodoModal onClose={() => setIsModalOpen(false)} />}
      {selectedTodoId && (
        <TodoDetailsModal
          data={{
            title: todoDetails?.title,
            description: todoDetails?.description,
            createdAt: todoDetails?.createdAt,
            deadline: todoDetails?.deadline,
            label: todoDetails?.label || "",
            workerNames: todoDetails?.workerId || [],
            type: todoDetails?.type || "",
            id: todoDetails?.id,
          }}
          onClose={() => setSelectedTodoId("")}
        />
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center text-black bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-xl mb-4">
              Are you sure you want to delete this todo?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleDeleteTodo}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="md:w-full flex w-full sm:w-3/5  lg:justify-between px-8 gap-5 h-2/3 pb-2 flex-col md:flex-row">
        <div className="h-full w-full md:w-full flex flex-col gap-3">
          <div className="text-xl bg-[#DAA421] rounded-xl text-white py-3 text-center flex items-center justify-center relative">
            TODO
            <BsThreeDotsVertical
              className="absolute right-3 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div className="w-full h-full flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            {todoData
              ?.filter((todo) => todo.type === "Todo")
              .map((item) => (
                <TodoCard
                  key={item.id}
                  createdAt={item.createdAt}
                  deadline={item.deadline}
                  description={item.description}
                  label={item.label}
                  members={item.workerNames}
                  onClick={() => openTodoDetailsModal(item.id)}
                  title={item.title}
                  onDelete={() => handleDeleteClick(item.id)}
                />
              ))}
          </div>
        </div>

        <div className="h-full w-full md:w-full flex flex-col gap-3">
          <div className="text-xl bg-[#DAA421] rounded-xl text-white py-3 text-center">
            Progress
          </div>
          <div className="w-full h-full flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            {todoData
              ?.filter((todo) => todo.type === "Progress")
              .map((item) => (
                <TodoCard
                  key={item.id}
                  createdAt={item.createdAt}
                  deadline={item.deadline}
                  description={item.description}
                  label={item.label}
                  members={item.workerNames}
                  onClick={() => openTodoDetailsModal(item.id)}
                  title={item.title}
                  onDelete={() => handleDeleteClick(item.id)}
                />
              ))}
          </div>
        </div>

        <div className="h-full w-full md:w-full flex flex-col gap-3">
          <div className="text-xl bg-[#DAA421] rounded-xl text-white py-3 text-center">
            Completed
          </div>
          <div className="w-full h-full flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            {todoData
              ?.filter((todo) => todo.type === "Completed")
              .map((item) => (
                <TodoCard
                  key={item.id}
                  createdAt={item.createdAt}
                  deadline={item.deadline}
                  description={item.description}
                  label={item.label}
                  members={item.workerNames}
                  onClick={() => openTodoDetailsModal(item.id)}
                  title={item.title}
                  onDelete={() => handleDeleteClick(item.id)}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="md:w-full hidden sm:flex w-2/5 p-0 h-full md:h-1/3 md:p-8 relative  flex-col gap-5 border-t-[1px] border-[#DAA421]">
        <h1 className="text-3xl">Reminder</h1>
        <div className="w-full h-full flex gap-4 overflow-x-auto hide-scrollbar">
          {todoData
            ?.filter((todo) => todo.type === "Reminder")
            .map((item) => (
              <TodoCard
                key={item.id}
                createdAt={item.createdAt}
                deadline={item.deadline}
                description={item.description}
                label={item.label}
                members={item.workerNames}
                onClick={() => openTodoDetailsModal(item.id)}
                title={item.title}
                onDelete={() => handleDeleteClick(item.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
