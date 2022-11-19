import React from "react";

function GalleryCardMain() {
  return (
    <div className="flex flex-wrap w-full bg-gray-800 py-32 px-10 relative mb-4">
      <img
        alt="gallery"
        className=" object-center   absolute left-0 right-0 -top-6 mx-auto"
        src="/images/reduxHome.png"
      />
      <div className="text-center relative z-10 w-full">
        <h2 className="text-2xl text-white font-medium title-font mb-2">
          Redux
        </h2>

        <a className="mt-3 text-green-300 inline-flex items-center">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
export default GalleryCardMain;
