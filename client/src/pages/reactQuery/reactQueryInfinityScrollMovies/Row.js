import { useCallback, useRef, useState } from "react";

import MovieCard from "./MovieCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Row() {
  const getMoviesPage = async (pageParam = 1, options = {}) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=cf44160d33707ad52293a99f6b27dd4b&language=en-US&page=${pageParam}`,
      options
    );
    return response.data;
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["movies"],
    ({ pageParam = 1 }) => getMoviesPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        // check if page is > 500
        return lastPage.page < 400 ? allPages.length + 1 : undefined;
      },
    }
  );
  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <div className="relative">
      <div className="w-full  px-2 py-16 sm:px-0" id="top">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-blue-800">
            React Query, Infinity scrolling
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 sm:grid-cols-3 md:grid-cols-4  items-center justify-center content-center">
          {data?.pages.map((pg) => {
            return pg.results.map((movie, i) => {
              if (pg.results.length === i + 1) {
                return (
                  <MovieCard ref={lastPostRef} key={movie.id} movie={movie} />
                );
              }
              return <MovieCard key={movie.id} movie={movie} />;
            });
          })}
        </div>
      </div>
      {isFetchingNextPage && <p className="center">Loading More Movies...</p>}
    </div>
  );
}
