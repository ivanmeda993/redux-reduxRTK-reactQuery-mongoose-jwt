import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

const GrayBtn = ({ text, onClick, type = "button", className, icon }) => {
  return (
    <button
      className={`inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
      {icon ? icon : <PlusIcon className="ml-2 w-3 h-3" />}
    </button>
  );
};

export default GrayBtn;
