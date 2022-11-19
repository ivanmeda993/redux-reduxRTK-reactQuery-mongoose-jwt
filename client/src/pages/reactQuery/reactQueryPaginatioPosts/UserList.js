import React from "react";
import UserCard from "./UserCard";

const UserList = ({ users }) => {
  console.log(users);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full pl-10">
      {users.data.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
