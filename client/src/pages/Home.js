import React from "react";
import Gallery from "../components/home/Gallery";
import Sidebar from "../components/shared/Sidebar";

export default function Home() {
  return (
    <>
      <section className="text-gray-600 body-font bg-gray-100">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src="/images/react.png"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Managing Global State in a React Application
            </h1>
            <p className="mb-8 leading-relaxed">
              While building your PWA, you may find the need to manage global
              state. There are many state management libraries out there that
              help you do just that, such as Redux and MobX. Mobify does not
              recommend any particular state-management library—and you can
              build a Mobify app without using one at all. You can always
              provide state information to your components via props, but if you
              want to use React’s more advanced features for managing state,
              this article will show you how.
            </p>
          </div>
        </div>
      </section>
      <Gallery />
      <Sidebar />
    </>
  );
}
