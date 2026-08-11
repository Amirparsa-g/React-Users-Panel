// import React from "react";
import UserCard from "./UserCard";
import type { User } from "../types/user";

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
      key={user.ID}
      user={user}
      onRemove={onRemove}
      changeStatus={changeStatus}
      isLoading={isLoading}
      error={error}
    />
  ));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-3">
      {mappedUsers}
    </div>
  );
};

export default UserList;
