import React, { useRef } from "react";

const MarkerModal = () => {
  const modalRef = useRef();
  return (
    <div
      tabIndex="-1"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0  h-screen  md:h-full flex bg-black/50 z-50"
    >
      <div
        ref={modalRef}
        className=" fixed right-1/2  z-50 justify-center items-center    flex bg-gray-200 z-50 w-[500px]  top-[33%] right-[25%] rounded-lg "
      >
        <form
          action="src/components/modals/userModal#"
          className="relative bg-white  shadow dark:bg-gray-700"
        >
          <div className="p-6 space-y-6">test</div>
        </form>
      </div>
    </div>
  );
};

export default MarkerModal;
