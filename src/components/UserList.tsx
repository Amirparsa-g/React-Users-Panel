// import React from "react";
// import UserCard from "./UserCard";
import type { User } from "../types/user";
import UserCard from "./UserCard";
import { useMediaQuery } from "../hooks/useMediaQuery";
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
  const isMobile = useMediaQuery("(max-width: 767px)");
  const mappedUsers = users.map((user) => (
    <>
      <UserCard
        user={user}
        isMobile={isMobile}
        isLoading={isLoading}
        onRemove={onRemove}
        changeStatus={changeStatus}
        error={error}
      />
    </>
  ));

  return (
    <div className="w-full md:userStats-card md:p-0 md:overflow-hidden">
      {!isMobile && (
        <table className="hidden md:table md:w-full md:table-fixed md:border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="w-6/12 text-left px-4 py-3 text-small font-bold uppercase tracking-wide text-gray-600">
                User
              </th>
              <th className="text-center px-4 py-3 text-small font-bold uppercase tracking-wide text-gray-600">
                Role
              </th>
              <th className="text-center px-4 py-3 text-small font-bold uppercase tracking-wide text-gray-600">
                Status
              </th>
              <th className="text-center px-4 py-3 text-small font-bold uppercase tracking-wide text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">{mappedUsers}</tbody>
        </table>
      )}
      {isMobile && <div className="md:hidden">{mappedUsers}</div>}
    </div>
  );
};

export default UserList;
