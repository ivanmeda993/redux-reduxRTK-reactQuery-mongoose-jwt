import React, { useState } from "react";
import Pagination from "./Pagination";
import UserList from "./UserList";
import { getUsersPage } from "./api/axios";
import { useQuery } from "@tanstack/react-query";

const ReactQueryPosts = () => {
  const [page, setPage] = useState(1);

  const {
    isLoading,
    isError,
    error,
    data: users,
    isFetching,
    isPreviousData,
  } = useQuery(["/users", page], () => getUsersPage(page), {
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading Users...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  const lastPage = () => setPage(users.total_pages);

  const firstPage = () => setPage(1);

  const pagesArray = Array(users.total_pages)
    .fill()
    .map((_, index) => index + 1);

  return (
    <div className="relative h-full bg-gradient-to-b pt-24 ">
      <main className="relative px-4 pb-24 lg:space-y-24 lg:px-16  ">
        <section className="md:space-y-24 flex flex-col justify-center items-center">
          <h1 className="text-3xl"> Pagination</h1>
          <UserList users={users} />
          <Pagination
            lastPage={lastPage}
            firstPage={firstPage}
            isPreviousData={isPreviousData}
            page={page}
            users={users}
            pagesArray={pagesArray}
            setPage={setPage}
          />
        </section>
      </main>
    </div>
  );
};

export default ReactQueryPosts;
