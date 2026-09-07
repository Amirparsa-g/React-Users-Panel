import type { User } from "../types/user";
import { useState } from "react";
import Buttons from "./Buttons";

const UserCard = ({
  user,
  isMobile,
  onRemove,
  changeStatus,
  isLoading,
  error,
}: {
  user: User;
  isMobile: boolean;
  onRemove: (id: number) => void;
  changeStatus: (user: User) => void;
  isLoading: boolean;
  error: string | null;
}) => {
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);
  return (
    <>
      {error && (
        <p className="text-danger text-xl text-center font-semibold">{error}</p>
      )}
      {!isMobile && (
        <tr
          aria-disabled={isLoading}
          className="hidden md:table-row hover:bg-gray-50 transition-colors"
        >
          <td className="px-4 py-6 align-middle">
            <div className="flex gap-2 items-center">
              <div
                className={
                  user.role === "admin"
                    ? "profile text-admin border border-admin"
                    : user.role === "operator"
                      ? "profile text-moderator border border-moderator"
                      : "profile"
                }
              >
                <div>
                  <p className="text-center">{user.fullName[0]}</p>
                  <span
                    className={`block  absolute end-px bottom-0 size-3 rounded-full ${user.isActive ? "bg-success" : "bg-danger"}`}
                  ></span>
                </div>
              </div>
              <div>
                <Buttons
                  comp="link"
                  more="text-black"
                  navigation={`/users/${user.ID}`}
                  buttonType="regular"
                >
                  <p className="text-body  font-bold">{user.fullName}</p>
                  <p className="text-small break-all caption">
                    {user.email ? user.email : "no email registered"}
                  </p>
                </Buttons>
              </div>
            </div>
          </td>
          <td className="px-4 py-3 text-center align-middle">
            <span
              className={
                user.role === "admin"
                  ? " admin-div text-center "
                  : user.role === "operator"
                    ? " moderator-div text-center"
                    : " customer-div text-center"
              }
            >
              {user.role}
            </span>
          </td>
          <td className="px-4 py-3 text-center align-middle">
            <span
              className={
                user.isActive
                  ? "bg-success/10 active-div text-center"
                  : "bg-danger/10 inactive-div text-center"
              }
            >
              {user.isActive ? "active" : "inactive"}
            </span>
          </td>
          <td className="px-4 py-3 align-middle">
            <div className="flex gap-1 justify-center">
              <Buttons
                comp="link"
                navigation={`/users/${user.ID}`}
                more="cursor-pointer relative group flex items-center justify-center"
                buttonType="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#1f1f1f"
                >
                  <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" />
                </svg>

                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap z-50">
                  View user
                </div>
              </Buttons>
              <Buttons
                disabled={updatingUserId === user.ID}
                onClick={async () => {
                  setUpdatingUserId(user.ID);
                  await onRemove(user.ID);
                  setUpdatingUserId(null);
                }}
                buttonType="regular"
                more="cursor-pointer relative group flex items-center justify-center"
                comp="link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ef4444"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>

                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap z-50">
                  Remove user
                </div>
              </Buttons>
              <Buttons
                disabled={updatingUserId === user.ID}
                onClick={async () => {
                  setUpdatingUserId(user.ID);
                  await changeStatus(user);
                  setUpdatingUserId(null);
                }}
                more="cursor-pointer relative group flex items-center justify-center"
                buttonType="regular"
                comp="link"
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

                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap z-50">
                  Change status
                </div>
              </Buttons>
            </div>
          </td>
        </tr>
      )}
      {isMobile && (
        <div className="md:hidden userStats-card mb-3">
          <div className="flex gap-2 items-center">
            <div
              className={
                user.role === "admin"
                  ? "profile admin-profile"
                  : user.role === "operator"
                    ? "profile moderator-profile"
                    : "profile customer-profile"
              }
            >
              <div>
                <p className="text-center font-bold">{user.fullName[0]}</p>
                <span
                  className={`block md:hidden absolute end-px bottom-0 size-3 rounded-full ${user.isActive ? "bg-success" : "bg-danger"}`}
                ></span>
              </div>
            </div>
            <div>
              <Buttons
                comp="link"
                navigation={`/users/${user.ID}`}
                more="text-black"
                buttonType="regular"
              >
                <p className="text-body font-bold">{user.fullName}</p>
                <p
                  className="
                 break-all caption"
                >
                  {user.email ? user.email : "no email registered"}
                </p>
                <div className="flex gap-2 mt-3">
                  <p className={user.isActive ? "active-div" : "inactive-div"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </p>
                  <p
                    className={
                      user.role === "admin"
                        ? "admin-div"
                        : user.role === "operator"
                          ? "moderator-div"
                          : "customer-div"
                    }
                  >
                    {user.role}
                  </p>
                </div>
              </Buttons>
            </div>
          </div>
          <div className="flex gap-2 mt-3 w-full">
            <Buttons
              comp="link"
              navigation={`/users/${user.ID}`}
              buttonType="HomePageLink"
              more="justify-center hover:bg-black/5 hover:border-black/70"
            >
              View
            </Buttons>
            <Buttons
              comp="link"
              buttonType="HomePageLink"
              navigation={`/users/${user.ID}/edit`}
              more=" justify-center hover:bg-black/5 hover:border-black/70"
            >
              Edit
            </Buttons>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
