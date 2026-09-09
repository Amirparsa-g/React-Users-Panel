import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import UserList from "../components/UserList";
import type { User } from "../types/user";
import Searchinput from "../components/Searchinput";

import { serverSearch } from "../services/userApi";
import Loading from "../components/Loading";
import UserError from "../components/UserError";
import Buttons from "../components/Buttons";

type StatusFilters = "active" | "inactive" | "all";
type RoleFilters = "admin" | "operator" | "customer" | "all";
const UsersPage = ({
  UsersList,
  status,
  setUserStatus,
  role,
  setRole,
  searchedTerm,
  setSearchTerm,
  SearchUser,
  removeUserHandler,
  ChangeStatusHandler,
  isLoading,
  setIsLoading,
  error,
  setError,
  LoadUser,
}: {
  UsersList: User[];

  status: StatusFilters;
  setUserStatus: (filter: StatusFilters) => void;
  role: RoleFilters;
  setRole: (filter: RoleFilters) => void;
  searchedTerm: string;
  setSearchTerm: (value: string) => void;
  SearchUser: (term: string) => void;
  removeUserHandler: (id: number) => void;
  ChangeStatusHandler: (user: User) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
  error: string | null;
  LoadUser: () => void;
}) => {
  const [isServer, setIsServer] = useState<boolean>(false);
  const [serverResult, setServerResult] = useState<User[]>([]);

  const term = searchedTerm.toLowerCase().trim();
  useEffect(() => {
    if (!isServer) return;
    const fetchServerResult = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const serachedServerUsers: User[] =
          term === "" ? [] : await serverSearch(term);
        setServerResult(serachedServerUsers);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        else {
          setError("Unexpected Error");
        }
      } finally {
        setIsLoading(false);
      }
    };
    void fetchServerResult();
  }, [searchedTerm, isServer, term]);
  const searchedUsers =
    isServer && searchedTerm.trim() !== ""
      ? serverResult
      : UsersList.filter((user) => user.fullName.toLowerCase().includes(term));

  const determinedStatusUsers: User[] = searchedUsers.filter((user) => {
    if (status === "all") return true;
    else if (status === "inactive") return !user.isActive;
    return user.isActive;
  });
  const displayedUsers: User[] = determinedStatusUsers.filter((user) => {
    if (role === "all") return true;
    else if (role === "admin") return user.role === "admin";
    else if (role === "operator") return user.role === "operator";
    return user.role === "customer";
  });

  useEffect(() => {
    document.title = "Users | User Management";
  }, []);

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (error) {
    content = <UserError LoadUser={LoadUser} />;
  } else {
    if (displayedUsers.length === 0) content = <EmptyState />;
    else {
      content = (
        <UserList
          users={displayedUsers}
          onRemove={removeUserHandler}
          changeStatus={ChangeStatusHandler}
          isLoading={isLoading}
          error={error}
        />
      );
    }
  }

  return (
    <div className="flex flex-col flex-wrap w-full">
      <div className="mb-5">
        <h2 className="font-bold text-header2">Users</h2>
        <p className="caption">Search, filter, view and manage users.</p>
      </div>
      <div className="w-full flex flex-col gap-4 md:flex-row md:gap-3 md:items-start bg-white userStats-card mb-5">
        <div className="md:w-8/12">
          <Searchinput
            onSearchChange={SearchUser}
            value={searchedTerm}
            isServer={isServer}
            setIsServer={setIsServer}
          />
        </div>
        <div className="md:w-4/12">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <label htmlFor="selectStatus">
                <p className="font-bold text-small text-gray-600 mb-1">
                  Status
                </p>
              </label>
              <select
                id="selectStatus"
                onChange={(e) => {
                  if (e.target.value === "All Statuses") setUserStatus("all");
                  else if (e.target.value === "Active") setUserStatus("active");
                  else setUserStatus("inactive");
                }}
                className="control p-3 w-full"
                value={
                  status === "all"
                    ? "All Statuses"
                    : status === "active"
                      ? "Active"
                      : "Inactive"
                }
              >
                <option value="All Statuses">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="selectRole">
                <p className="font-bold text-small text-gray-600 mb-1">Roles</p>
              </label>
              <select
                id="selectRole"
                onChange={(e) => {
                  if (e.target.value === "All Roles") setRole("all");
                  else if (e.target.value === "Admin") setRole("admin");
                  else if (e.target.value === "Operator") setRole("operator");
                  else setRole("customer");
                }}
                className="control p-3 w-full"
                value={
                  role === "all"
                    ? "All Roles"
                    : role === "admin"
                      ? "Admin"
                      : role === "operator"
                        ? "Operator"
                        : "Customer"
                }
              >
                <option value="All Roles">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Operator">Operator</option>
                <option value="Customer">Customer</option>
              </select>
            </div>

            <div className="flex items-end">
              <Buttons
                comp="button"
                buttonType="neutral"
                more="w-full md:w-auto md:min-w-24 md:px-6 md:h-[46px]" // ارتفاع دکمه هم‌اندازه با سلکت‌ها تنظیم شد
                onClick={() => {
                  setSearchTerm("");
                  setUserStatus("all");
                  setRole("all");
                }}
              >
                Clear
              </Buttons>
            </div>
          </div>
        </div>
      </div>

      {content}
    </div>
  );
};

export default UsersPage;
