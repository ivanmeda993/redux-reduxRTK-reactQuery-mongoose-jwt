import React from "react";

const Btn = ({ text, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        w-[300px] py-4 text-xl text-center text-white transition-colors duration-300 bg-green-400 rounded-full hover:bg-green-500 ease px-9 ${className}
      `}
    >
      {text}
    </button>
  );
};

export default Btn;
