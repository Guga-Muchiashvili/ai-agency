import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const CheckModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-fit text-center">
        <h2 className="text-2xl mb-4 text-black">{message}</h2>
        <div className="flex justify-around">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckModal;
