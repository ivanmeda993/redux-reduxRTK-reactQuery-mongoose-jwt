import React from "react";

function UserTableHead() {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-all-search" className="sr-only">
              checkbox
            </label>
          </div>
        </th>
        <th scope="col" className="py-3 px-6">
          Name
        </th>
        <th scope="col" className="py-3 px-6">
          Position
        </th>
        <th scope="col" className="py-3 px-6">
          Role
        </th>
        <th scope="col" className="py-3 px-6">
          Status
        </th>

        <th scope="col" className="py-3 px-6">
          Action
        </th>
      </tr>
    </thead>
  );
}
export default UserTableHead;
