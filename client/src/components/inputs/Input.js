import React from "react";

const Input = ({
  type = "text",
  onChange,
  text,
  name,
  placeholder,
  value,
  className,
}) => {
  return (
    <div className={`col-span-6 sm:col-span-3 ${className}`}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {text}
      </label>
      <input
        value={value}
        type={type}
        name={name}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
