import React from "react";
import GalleryCard from "./GalleryCard";

const Gallery = () => {
  return (
    <div>
      <div className="container  pt-16  mx-auto ">
        <div className="container mx-auto">
          <div className="text-center lg:w-2/3 w-full mx-auto">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              The Top React Component Libraries that are Worth Trying
            </h1>
            <p className="mb-8 leading-relaxed">
              With the launch in 2013, the React JS JavaScript library started
              getting massive recognition around the globe. Developers need to
              use React JS for all kinds of applications. One of the keys and
              significant reasons for the growth of React JS is the array of
              React component libraries. Developers have developed beautiful
              user interfaces for web, desktop, and hybrid applications using
              these easy-to-use libraries. Most regularly used framework
              revelations suggest that 60 percent of professionals use React,
              followed by Vue at 33 percent, 21 percent Angular.JS, and 20
              percent Angular.
            </p>
          </div>
          <div className="xl:py-16 lg:py-16 md:py-16 sm:py-16 px-15 flex flex-wrap justify-center">
            <GalleryCard src="/images/reduxHome.png" href="/redux" />
            <GalleryCard
              src="/images/react-query-seeklogo.com.svg"
              href="/react-query"
            />
            <GalleryCard
              src="/images/recoil.png"
              href="/"
              className="!border-r-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
