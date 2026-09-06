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
    <>
      <UserCard
        user={user}
        isMobile={true}
        isLoading={isLoading}
        onRemove={onRemove}
        changeStatus={changeStatus}
        error={error}
      />
      <UserCard
        user={user}
        isMobile={false}
        isLoading={isLoading}
        onRemove={onRemove}
        changeStatus={changeStatus}
        error={error}
      />
    </>
  ));

  return (
    <div className="w-full md:userStats-card md:overflow-hidden">
      <table className="hidden md:table md:w-full md:table-fixed border-collapse">
        <thead>
          {/* حاشیه پایین هدر پررنگ‌تر شد (border-gray-300) و پدینگ عمودی بیشتر شد (py-5) */}
          <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-gray-300 bg-slate-50/50">
            <th className="w-7/12 sm:w-1/2 px-6 py-5">User</th>
            <th className="text-center px-6 py-5">Role</th>
            <th className="hidden md:table-cell px-6 py-5">Status</th>
            <th className="hidden md:table-cell px-6 py-5">Actions</th>
          </tr>
        </thead>
        {/* 
        divide-gray-200: خطوط بین ردیف‌ها را پررنگ‌تر می‌کند
        [&_td]:py-5: به صورت خودکار به تمام تگ‌های td داخل ردیف‌ها پدینگ بالا و پایین می‌دهد 
      */}
        <tbody className="divide-y divide-gray-200 [&_td]:py-5">
          {mappedUsers}
        </tbody>
      </table>
      <div className="md:hidden">{mappedUsers}</div>
    </div>
  );
};

export default UserList;
