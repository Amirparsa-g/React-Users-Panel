import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import UserList from "../components/UserList";
import type { User } from "../types/user";
import Searchinput from "../components/Searchinput";

import { serverSearch } from "../services/userApi";
import Loading from "../components/Loading";
import UserError from "../components/UserError";

type Filters = "active" | "inactive" | "all";
const UsersPage = ({
  UsersList,
  status,
  setUserStatus,
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

  status: Filters;
  setUserStatus: (filter: Filters) => void;
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

  const displayedUsers: User[] = searchedUsers.filter((user) => {
    if (status === "all") return true;
    else if (status === "inactive") return !user.isActive;
    return user.isActive;
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
      <div className="w-full flex flex-col gap-4 md:flex-row md:gap-3 md:items-end bg-white userStats-card mb-5">
        <div className="md:w-8/12">
          <Searchinput
            onSearchChange={SearchUser}
            value={searchedTerm}
            isServer={isServer}
            setIsServer={setIsServer}
          />
        </div>
        <div className="md:w-3/12">
          <label htmlFor="">
            <p className="font-bold text-small text-gray-600 mb-1">status</p>

            <select
              onChange={(e) => {
                if (e.target.value === "All Statuses") setUserStatus("all");
                else if (e.target.value === "Active") setUserStatus("active");
                else setUserStatus("inactive");
              }}
              className="control p-3"
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
          </label>
        </div>
        <button
          className="neutral-button w-full md:w-auto md:min-w-24 md:px-6 md:h-12"
          onClick={() => {
            setSearchTerm("");
            setUserStatus("all");
          }}
        >
          Clear
        </button>
      </div>

      {content}
    </div>
  );
};

export default UsersPage;
