import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import UserList from "../components/UserList";
import type { User } from "../types/user";
import Searchinput from "../components/Searchinput";
import UserStats from "../components/UserStats";

import { Link } from "react-router-dom";
import { serverSearch } from "../services/userApi";
type Filters = "active" | "inactive" | "all";
const UsersPage = ({
  UsersList,
  status,
  setUserStatus,
  searchedTerm,
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
  SearchUser: (term: string) => void;
  removeUserHandler: (id: number) => void;
  ChangeStatusHandler: (user: User) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
  error: string | null;
  LoadUser: () => void;
}) => {
  const allUsers = UsersList;
  const [isServer, setIsServer] = useState<boolean>(false);
  const [serverResult, setServerResult] = useState<User[]>([]);
  const ActiveUsers = UsersList.filter((user) => user.isActive);
  const InActiveUsers = UsersList.filter((user) => !user.isActive);
  const term = searchedTerm.toLowerCase().trim();
  useEffect(() => {
    const fetchServerResult = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const serachedServerUsers: User[] = await serverSearch(term);
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
  }, [searchedTerm, isServer]);
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
    content = (
      <>
        <h2 className="text-center text-3xl font-semibold">Loadin Users ...</h2>
      </>
    );
  } else if (error) {
    content = (
      <h2 className="text-center text-3xl font-semibold text-red-600">
        Failed to load the Users
      </h2>
    );
  } else {
    if (UsersList.length === 0 || displayedUsers.length === 0)
      content = (
        <EmptyState
          UsersList={UsersList}
          displayedUsers={displayedUsers}
          status={status}
          searchedTerm={searchedTerm}
        />
      );
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
    <div className="flex flex-col flex-wrap items-center max-w-full">
      <Searchinput
        onSearchChange={SearchUser}
        value={searchedTerm}
        isServer={isServer}
        setIsServer={setIsServer}
      />
      <div className="flex items-center justify-center gap-2 w-full">
        <button
          onClick={() => setUserStatus("active")}
          className="bg-slate-50  mt-5 border border-green-500 p-3 rounded-2xl hover:scale-105 ease-in-out duration-300 mb-3 w-35"
        >
          active
        </button>
        <button
          onClick={() => setUserStatus("inactive")}
          className="bg-slate-50  mt-5 border border-red-500 p-3 rounded-2xl hover:scale-105 ease-in-out duration-300 mb-3 w-35"
        >
          inactive
        </button>
        <button
          onClick={() => setUserStatus("all")}
          className="bg-slate-50  mt-5 border border-blue-500 p-3 rounded-2xl hover:scale-105 ease-in-out duration-300 mb-3 w-35"
        >
          all
        </button>
      </div>
      <Link
        to="/users/new"
        className="bg-slate-50 block m-auto mt-5 border border-purple-500 p-3 rounded-2xl hover:scale-105 ease-in-out duration-300 mb-3 w-35"
      >
        Add User
      </Link>

      {content}
      <UserStats
        allUsers={allUsers.length}
        ActiveUsers={ActiveUsers.length}
        InActiveUsers={InActiveUsers.length}
      />
      <button
        onClick={LoadUser}
        className="bg-slate-50 mt-5 border border-blue-500 p-3 rounded-2xl hover:scale-105 ease-in-out duration-300 mb-3 w-32"
      >
        retry
      </button>
    </div>
  );
};

export default UsersPage;
