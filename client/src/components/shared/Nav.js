import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  //change navbar color when scrolling
  const [navbarColor, setNavbarColor] = React.useState(false);
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setNavbarColor(true);
    } else {
      setNavbarColor(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  return (
    <header
      className={`text-gray-600 body-font fixed w-full transform duration-200 ease-in ${
        navbarColor && "bg-gray-200 z-[99]"
      }`}
    >
      <div className="container mx-auto flex  p-5 flex-col md:flex-row items-center justify-between">
        <NavLink
          to="/"
          className="flex order-first lg:order-none  title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0"
        >
          <img src="/images/react.png" alt="" className="w-14 h-14" />
          <span className="ml-3 text-xl">React</span>
        </NavLink>
      </div>
    </header>
  );
}
