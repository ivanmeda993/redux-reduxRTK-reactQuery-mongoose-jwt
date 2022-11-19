import React, { useRef, useState } from "react";
import useOnClickOutside from "../../../../../hooks/useClickOutside";
import { useDispatch } from "react-redux";

function TableActions() {
  const [showActions, setShowActions] = useState(false);
  const actionRef = useRef();
  useOnClickOutside(actionRef, () => setShowActions(false));

  return (
    <div className="relative">
      <button
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        onClick={() => setShowActions(!showActions)}
      >
        <span className="sr-only">Action button</span>
        Actions
        <svg
          className="ml-2 w-3 h-3"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {showActions && (
        <div
          className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600  dropDownBtn absolute top-9"
          ref={actionRef}
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownActionButton"
          >
            <li className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
              Reward
            </li>
            <li className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
              Promote
            </li>
            <li className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
              Activate account
            </li>
          </ul>
          <div className="py-2 block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
            Delete Users
          </div>
        </div>
      )}
    </div>
  );
}
export default TableActions;
