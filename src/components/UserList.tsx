import React from "react";
import UserCard from "./UserCard";
import type { User } from "../types/user";

const UserList = ({ users }: { users: User[] }) => {
  const mappedUsers = users.map((user) => (
    <UserCard key={user.ID} user={user} />
  ));
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{mappedUsers}</div>
  );
};

export default UserList;
