import React from "react";
import { NoSymbolIcon } from "@heroicons/react/20/solid";

const Pagination = ({
  page,
  pagesArray,
  firstPage,
  lastPage,
  setPage,
  users,
  isPreviousData,
}) => {
  console.log(pagesArray);
  console.log(isPreviousData || page === users.total_pages);
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px">
        <button
          className={`pagination-link rounded-l-lg ${
            isPreviousData || (page === 1 && "cursor-not-allowed")
          } `}
          onClick={firstPage}
          disabled={isPreviousData || page === 1}
        >
          {isPreviousData || page === 1 ? (
            <NoSymbolIcon className="w-6 h-6" />
          ) : (
            "Previous"
          )}
        </button>

        {pagesArray.map((page) => (
          <li
            key={page}
            className={`pagination-link ${
              page === users.page ? "bg-gray-200" : ""
            }`}
            onClick={() => setPage(page)}
          >
            {page}
          </li>
        ))}

        <button
          className={`pagination-link rounded-r-lg  ${
            isPreviousData || page === users.total_pages
              ? " cursor-not-allowed"
              : ""
          }`}
          onClick={lastPage}
          disabled={isPreviousData || page === users.total_pages}
        >
          {isPreviousData || page === users.total_pages ? (
            <NoSymbolIcon className="w-6 h-6" />
          ) : (
            "Next"
          )}
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
