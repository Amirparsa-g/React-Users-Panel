// import React from "react";
// import UserCard from "./UserCard";
import type { User } from "../types/user";
import UserCard from "./UserCard";
const UserList = ({
  users,
  onRemove,
  changeStatus,
  isLoading,
  error,
}: {
  users: User[];
  onRemove: (id: number) => void;
  changeStatus: (user: User) => void;
  isLoading: boolean;
  error: string | null;
}) => {
  const mappedUsers = users.map((user) => (
    <UserCard
      user={user}
      isLoading={isLoading}
      onRemove={onRemove}
      changeStatus={changeStatus}
      error={error}
    />
  ));

  return (
    <div className="w-full border-gray-100 shadow-md p-2 ">
      <table className="w-full border-separate border-spacing-y-4 border-spacing-x-4">
        <thead className="border-b border-b-black text-left">
          <th>User</th>
          <th>role</th>
          <th className="hidden md:flex">status</th>
          <th className="hidden md:flex">Actions</th>
        </thead>
        <tbody>{mappedUsers}</tbody>
      </table>
    </div>
  );
};

export default UserList;
