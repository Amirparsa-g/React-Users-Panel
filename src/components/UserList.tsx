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
    <div className="w-full userStats-card">
      <table className="w-full table-fixed border-separate border-spacing-y-4 border-spacing-x-4">
        <thead className=" text-left">
          <tr>
            <th className="w-7/12 sm:w-1/2 ">User</th>
            <th className="text-center">role</th>
            <th className="hidden md:table-cell">status</th>
            <th className="hidden md:table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>{mappedUsers}</tbody>
      </table>
    </div>
  );
};

export default UserList;
