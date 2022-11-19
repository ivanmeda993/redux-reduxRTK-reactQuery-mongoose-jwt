import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          src={user?.avatar}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user?.name} {user?.last_name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </span>{" "}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          id: {user.id}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
