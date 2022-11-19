import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CodeBracketIcon,
} from "@heroicons/react/20/solid";

const Submenu = ({ item, setLogo, open }) => {
  const [subNav, setSubNav] = useState(false);

  const toggleSubNav = (i) => {
    if (i.submenu) {
      setSubNav((prev) => !prev);
    }
    if (i.logo) {
      setLogo(i.logo);
    }
  };
  return (
    <div>
      <div
        className={`
        flex items-center  ${
          open ? "p-4" : "p-2"
        } gap-4 hover:bg-[#1da1f2]/60 rounded-lg cursor-pointer w-full justify-between items-center
      w-full`}
        onClick={() => toggleSubNav(item)}
      >
        <Link to={item.link}>
          <div className="flex items-center  w-full gap-2">
            {item.logo && (
              <img src={item.logo} alt="" className="w-10 h-10  object-fill" />
            )}
            {item.icon && item.icon}
            {open && <p>{item.title}</p>}
          </div>
        </Link>
        {open && (
          <div className="transform transition duration-300">
            {item.submenu && subNav && (
              <ChevronDownIcon className={`smallIcon ml-auto `} />
            )}
            {item.submenu && !subNav && (
              <ChevronUpIcon className={`smallIcon ml-auto `} />
            )}
          </div>
        )}
      </div>
      <div className="w-[86%] ml-auto">
        {subNav &&
          item.submenu.map((subItem, index) => (
            <Link
              key={index}
              to={subItem.link}
              className="flex items-center justify-between gap-2 w-full  hover:bg-[#1da1f2]/60 rounded-lg cursor-pointer p-2"
            >
              <div className="flex   w-full gap-2">
                <CodeBracketIcon className="smallIcon w-7 h-7" />
                {open && (
                  <div className="flex flex-col items-start text-sm">
                    {subItem.title}
                    <span className="text-gray-500 text-xs">
                      {subItem.subText}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Submenu;
{
  /*{item.submenu &&*/
}
{
  /*  item.submenu.map((subitem, index) => (*/
}
{
  /*    <Link*/
}
{
  /*      key={index}*/
}
{
  /*      to={subitem.link}*/
}
{
  /*      className="flex items-center p-4 gap-4 hover:bg-[#1da1f2]/60 rounded-lg cursor-pointer"*/
}
{
  /*    >*/
}
{
  /*      <img src={subitem.logo} alt="" className="w-8 h-8  object-fill" />*/
}
{
  /*      <p>{subitem.title}</p>*/
}
{
  /*    </Link>*/
}
{
  /*  ))}*/
}
