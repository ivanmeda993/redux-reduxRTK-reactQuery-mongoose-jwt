import React from "react";
import ReactPlayer from "react-player";
const youTubeLinks = [
  {
    id: 1,

    link: "https://www.youtube.com/watch?v=9zySeP5vH9c",
  },
  {
    id: 2,

    link: "https://www.youtube.com/watch?v=NqzdVN2tyvQ&list=PL0Zuz27SZ-6M1J5I1w2-uZx36Qp6qhjKo&index=8",
  },
  {
    id: 3,

    link: "https://www.youtube.com/watch?v=LDS1ll93P-s&t=546s",
  },
];
export const Redux = () => {
  return (
    <>
      <div className="max-w-6xl h-screen flex justify-center items-center mx-auto">
        <div className=" justify-center w-full h-screen mt-[300px]  p-8 w-full">
          <h1 className="text-center text-4xl">
            Redux
            <p className="text-sm">Useful links</p>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {youTubeLinks.map((link) => (
              <div className=" flex flex-col h-[400px] w-full">
                <ReactPlayer
                  url={link.link}
                  width="100%"
                  height="100%"
                  controls
                  className="react-player"
                />
                <h2 className="text-center -mt-5">{link.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
