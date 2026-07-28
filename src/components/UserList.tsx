// import React from "react";
import UserCard from "./UserCard";
import type { User } from "../types/user";

const UserList = ({
  users,
  onRemove,
  changeStatus,
  setSelectedUser,
  setIsFormVisible,
}: {
  users: User[];
  onRemove: (id: number) => void;
  changeStatus: (id: number) => void;
  setSelectedUser: (user: User) => void;
  setIsFormVisible: (status: boolean) => void;
}) => {
  const mappedUsers = users.map((user) => (
    <UserCard
      key={user.ID}
      user={user}
      onRemove={onRemove}
      changeStatus={changeStatus}
      setSelectedUser={setSelectedUser}
      setIsFormVisible={setIsFormVisible}
    />
  ));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-3">
      {mappedUsers}
    </div>
  );
};

export default UserList;
