import React from "react";
import UserCard from "./UserCard";
import type { User } from "../types/user";

const UserList = ({
  users,
  onRemove,
}: {
  users: User[];
  onRemove: (id: number) => void;
}) => {
  const mappedUsers = users.map((user) => (
    <UserCard key={user.ID} user={user} onRemove={onRemove} />
  ));
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mappedUsers}
    </div>
  );
};

export default UserList;
