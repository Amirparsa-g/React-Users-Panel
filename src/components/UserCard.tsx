import { Link } from "react-router-dom";
import type { User } from "../types/user";
import { useState } from "react";
const UserCard = ({
  user,
  onRemove,
  changeStatus,
  isLoading,
  error,
}: {
  user: User;
  onRemove: (id: number) => void;
  changeStatus: (user: User) => void;
  isLoading: boolean;
  error: string | null;
}) => {
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  return (
    <div
      className="bg-slate-50 text-center p-2 rounded-2xl mx-4 border border-purple-500 shadow-lg hover:scale-101 ease-in-out duration-200"
      aria-disabled={isLoading}
    >
      {error && (
        <p className="text-red-600 text-xl text-center font-semibold">
          {error}
        </p>
      )}
      <p className="p-0.5">{user.fullName}</p>
      <p className="p-0.5">{user.age}</p>
      <p className="p-0.5">{user.role}</p>
      {user.email ? <p>{user.email}</p> : <p>ایمیل ثبت نشده است</p>}
      {user.isActive ? <p>Active</p> : <p>InActive</p>}
      <div className="flex justify-center gap-4">
        <button
          disabled={updatingUserId === user.ID}
          onClick={async () => {
            setUpdatingUserId(user.ID);
            await onRemove(user.ID);
            setUpdatingUserId(null);
          }}
          className="text-white bg-red-500 p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300  border-2 border-red-700"
        >
          Remove
        </button>
        <button
          disabled={updatingUserId === user.ID}
          onClick={async () => {
            setUpdatingUserId(user.ID);
            await changeStatus(user);
            setUpdatingUserId(null);
          }}
          className="bg-purple-400 text-white p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300 border-2 border-purple-700"
        >
          changeStatus
        </button>

        <Link
          to={`/users/${user.ID}`}
          className="bg-cyan-400 text-white p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300 border-2 border-cyan-700"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
