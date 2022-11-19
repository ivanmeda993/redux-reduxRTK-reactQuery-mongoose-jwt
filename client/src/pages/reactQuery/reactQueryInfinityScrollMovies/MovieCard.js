import React from "react";

const MovieCard = React.forwardRef(({ movie }, ref) => {
  return (
    <div
      ref={ref && ref}
      className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 h-52  bg-black/70 rounded-lg flex flex-col"
    >
      <img
        className=" h-full w-full rounded-lg  transition-all duration-300"
        src={`https://image.tmdb.org/t/p/w500${
          movie?.img || movie?.poster_path
        }`}
        alt="image description"
      />
    </div>
  );
});

export default MovieCard;
