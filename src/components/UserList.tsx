// import React from "react";
import UserCard from "./UserCard";
import type { User } from "../types/user";

const UserList = ({
  users,
  onRemove,
  changeStatus,
}: {
  users: User[];
  onRemove: (id: number) => void;
  changeStatus: (id: number) => void;
}) => {
  const mappedUsers = users.map((user) => (
    <UserCard
      key={user.ID}
      user={user}
      onRemove={onRemove}
      changeStatus={changeStatus}
    />
  ));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-3">
      {mappedUsers}
    </div>
  );
};

export default UserList;
