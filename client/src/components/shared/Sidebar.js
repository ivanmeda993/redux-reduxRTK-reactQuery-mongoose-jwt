import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import useMediaQuery from "../../hooks/useMedia";
import Submenu from "./Submenu";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const Menus = [
    {
      title: "Home",
      link: "/",
      logo: "/images/react.png",
    },

    {
      title: "Redux",
      link: "/redux",
      logo: "/images/redux.svg",
      submenu: [
        {
          title: "Toolkit Counter",
          subText: "Basic redux toolkit",
          link: "/redux/counter",
        },
        {
          title: "Toolkit Posts",
          subText: "CRUD",

          link: "/redux/posts",
        },
        {
          title: "AsyncThunk Posts",
          subText: "CRUD",
          link: "/redux/async-posts",
        },
        {
          title: "RTK Query",
          subText: "JWT Auth, CRUD",
          link: "/redux/rtk",
        },
      ],
    },
    {
      title: "React Query",
      link: "/react-query",

      logo: "/images/react-query-seeklogo.com.svg",
      submenu: [
        {
          title: "React Query Map",
          subText: "CRUD, optimistic updates",
          link: "/react-query/locations",
        },
        {
          title: "React Query Movies",
          subText: "Infinity Scroll",
          link: "/react-query/movies",
        },
        {
          title: "React Query Posts",
          subText: "Pagination",
          link: "/react-query/users",
        },
      ],
    },
  ];
  const [logo, setLogo] = useState("/images/redux.svg");

  return (
    <div>
      <div className="flex relative ">
        <div
          className={` ${
            open ? "w-72" : "w-24 "
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300 border-r-2 border-gray-300 !fixed z-30 bg-gray-200`}
        >
          <img
            src="/assets/control.png"
            className={`absolute cursor-pointer -right-5 top-[6.5rem] w-10 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src={logo}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg] max-w-[100px]"
              }`}
            />
          </div>
          <nav className="pt-6  flex flex-col w-full gap-4">
            {Menus.map((Menu, index) => {
              return (
                <Submenu
                  item={Menu}
                  key={index}
                  setLogo={setLogo}
                  open={open}
                />
              );
            })}
          </nav>
        </div>
        <div className={`flex-1   ${open && !isMobile ? "!ml-72" : "ml-24"}`}>
          {!isMobile && <Nav />}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
