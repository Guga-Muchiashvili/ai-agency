import React from "react";
import { FaTrash } from "react-icons/fa";

interface TodoCardProps {
  title: string;
  description: string;
  members: string[];
  createdAt: string;
  deadline: string;
  label: string;
  onClick: () => void;
  onDelete: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  title,
  description,
  members,
  createdAt,
  deadline,
  label,
  onClick,
  onDelete,
}) => {
  return (
    <div
      className="w-full bg-black border-[1px] border-white rounded-xl flex flex-col gap-3 p-4 relative cursor-pointer"
      style={{ borderLeft: `4px solid ${label}` }}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{title}</h3>
        <span
          className="px-2 py-1 text-white text-xs rounded-lg"
          style={{ backgroundColor: label }}
        >
          {label}
        </span>
        <FaTrash
          className="text-red-500 cursor-pointer absolute bottom-4 right-4"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </div>
      <p className="text-sm text-gray-400">{description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{members.join(", ")}</span>
        <span>{createdAt}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{`Deadline: ${deadline}`}</span>
      </div>
    </div>
  );
};

export default TodoCard;
