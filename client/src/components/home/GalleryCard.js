import React from "react";
import { Link } from "react-router-dom";

const GalleryCard = ({ src, title, href, className }) => {
  return (
    <div
      className={`w-6/12 xl:w-1/3 lg:w-1/3 md:w-1/3 flex justify-center xl:border-b lg:border-b xl:border-r lg:border-r :border-r border-gray-200 xl:pb-10 pb-16 items-center flex-col ${className} `}
    >
      <img
        tabIndex="0"
        className="focus:outline-none my-auto object-cover max-w-[240px]"
        src={src}
        alt={title}
        role="img"
      />
      <Link
        to={href}
        className="text-green-300 inline-flex items-center text-2xl"
      >
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
      </Link>
    </div>
  );
};

export default GalleryCard;
