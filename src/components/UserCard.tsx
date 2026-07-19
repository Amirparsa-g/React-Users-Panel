import React from "react";
import type { User } from "../types/user";
const UserCard = ({
  user,
  onRemove,
}: {
  user: User;
  onRemove: (id: number) => void;
}) => {
  return (
    <div className="bg-slate-50 text-center p-2 rounded-2xl mx-4 border border-purple-500 shadow-lg">
      <p className="p-0.5">{user.fullName}</p>
      <p className="p-0.5">{user.age}</p>
      <p className="p-0.5">{user.role}</p>
      {user.email ? <p>{user.email}</p> : <p>ایمیل ثبت نشده است</p>}
      {user.isActive ? <p>Active</p> : <p>InActive</p>}
      <button
        onClick={() => onRemove(user.ID)}
        className="text-white bg-red-500 p-2 rounded-2xl mt-2"
      >
        Remove
      </button>
    </div>
  );
};

export default UserCard;
