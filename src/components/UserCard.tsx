import React from "react";
import type { User } from "../types/user";
const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="bg-slate-50 text-center p-2 rounded-2xl mx-4 border border-purple-500 shadow-lg">
      <p>{user.fullName}</p>
      <p>{user.age}</p>
      <p>{user.role}</p>
      {user.email ? <p>{user.email}</p> : <p>ایمیل ثبت نشده است</p>}
      {user.isActive ? <p>Active</p> : <p>InActive</p>}
    </div>
  );
};

export default UserCard;
