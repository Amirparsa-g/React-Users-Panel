import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import UserList from "../components/UserList";
import type { User } from "../types/user";
import Searchinput from "../components/Searchinput";
import UserStats from "../components/UserStats";
import { serverSearch } from "../services/userApi";
import { Link } from "react-router-dom";
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
  const Admins = UsersList.filter((user) => user.role === "admin");
  const moderators = UsersList.filter((user) => user.role === "operator");
  const customers = UsersList.filter((user) => user.role === "customer");
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
      <h2 className="text-center text-3xl font-semibold text-danger">
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
    <div className="flex flex-col flex-wrap w-full">
      <div>
        <Searchinput
          setUserStatus={setUserStatus}
          onSearchChange={SearchUser}
          value={searchedTerm}
          isServer={isServer}
          setIsServer={setIsServer}
        />
      </div>
      <div className="flex items-center justify-center gap-4 w-full mt-5 md:hidden">
        <button
          onClick={() => setUserStatus("active")}
          className={
            status === "active" ? "success-button" : "button-not-selected"
          }
        >
          active
        </button>
        <button
          onClick={() => setUserStatus("inactive")}
          className={
            status === "inactive" ? "danger-button" : "button-not-selected"
          }
        >
          inactive
        </button>
        <button
          onClick={() => setUserStatus("all")}
          className={
            status === "all" ? "neutral-button" : "button-not-selected"
          }
        >
          all
        </button>
      </div>
      <Link
        to="/"
        className="flex justify-center items-center mt-5 md:justify-start md:items-start"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
        <span className=" ml-4 text-black">Back to Home</span>
      </Link>
      <UserStats
        isLoading={isLoading}
        allUsers={allUsers.length}
        Admins={Admins.length}
        Moderators={moderators.length}
        Customers={customers.length}
      />
      {content}

      <button onClick={LoadUser} className="neutral-button mt-5 block mx-auto">
        retry
      </button>
    </div>
  );
};

export default UsersPage;
