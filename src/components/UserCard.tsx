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
    <>
      {error && (
        <p className="text-red-600 text-xl text-center font-semibold">
          {error}
        </p>
      )}
      <tr aria-disabled={isLoading}>
        <td>
          <Link to={`/users/${user.ID}`} className="text-black">
            <p className="text-body font-header2">{user.fullName}</p>
            <p className="text-small">
              {user.email ? user.email : "no email registered"}
            </p>
          </Link>
        </td>
        <td
          className={
            user.role === "admin"
              ? "bg-admin/10 text-admin stats-header text-center"
              : user.role === "operator"
                ? "bg-moderator/10 text-moderator stats-header text-center"
                : "bg-black/10 text-black stats-header text-center"
          }
        >
          {user.role}
        </td>
        <td
          className={
            user.isActive
              ? "bg-success/10 text-success stats-header text-center hidden md:flex"
              : "bg-danger/10 text-danger stats-header text-center hidden md:flex"
          }
        >
          {user.isActive ? "active" : "inactive"}
        </td>
        <td>
          <div className="hidden md:flex gap-1">
            <Link to={`/users/${user.ID}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" />
              </svg>
            </Link>
            <button
              disabled={updatingUserId === user.ID}
              onClick={async () => {
                setUpdatingUserId(user.ID);
                await onRemove(user.ID);
                setUpdatingUserId(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
            <button
              disabled={updatingUserId === user.ID}
              onClick={async () => {
                setUpdatingUserId(user.ID);
                await changeStatus(user);
                setUpdatingUserId(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </button>
          </div>
        </td>
        <td className="flex md:hidden">
          <div className="select-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </svg>
            <select
              value=""
              onChange={async (e) => {
                if (e.target.value === "remove user") {
                  setUpdatingUserId(user.ID);
                  await onRemove(user.ID);
                  setUpdatingUserId(null);

                  e.target.value = "";
                }
              }}
            >
              <option value="" disabled hidden></option>
              <option>remove user</option>
            </select>
          </div>
        </td>
      </tr>
    </>
  );
};

export default UserCard;
