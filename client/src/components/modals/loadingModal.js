import React from "react";

const LoadingModal = () => {
  return (
    <div
      tabIndex="-1"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0  h-screen  md:h-full flex bg-black/50 z-50"
    >
      <img src="/images/react.png" alt="" className="w-52 h-52 animate-spin" />
    </div>
  );
};

export default LoadingModal;
