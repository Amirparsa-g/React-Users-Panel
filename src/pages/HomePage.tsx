import { Link } from "react-router-dom";
import UserStats from "../components/UserStats";
import type { User } from "../types/user";
import { useEffect } from "react";

const HomePage = ({ UsersList }: { UsersList: User[] }) => {
  const allUsers = UsersList;
  const ActiveUsers = UsersList.filter((user) => user.isActive);
  const InActiveUsers = UsersList.filter((user) => !user.isActive);
  useEffect(() => {
    document.title = "Home | User Management";
  }, []);
  return (
    <>
      <h1 className="text-center">User Managment Project</h1>
      <div className="flex justify-center items-center m-3 p-2 border border-purple-400 rounded-md bg-slate-50">
        <p>
          This is a User Managment Project with the avility to add Users ,
          change their status , search among all, Active and inActive Users{" "}
        </p>
      </div>
      <UserStats
        allUsers={allUsers.length}
        ActiveUsers={ActiveUsers.length}
        InActiveUsers={InActiveUsers.length}
      />
      <div className="flex justify-center items-center  gap-3 p-3">
        <Link
          to="/users"
          className="bg-slate-50 border border-purple-400 shadow-md rounded-md p-2 hover:scale-105 transition-all ease-in-out duration-300"
        >
          Users Page
        </Link>
        <Link
          to="/users/new"
          className="bg-slate-50 border border-purple-400 shadow-md rounded-md p-2 hover:scale-105 transition-all ease-in-out duration-300"
        >
          Add User Page
        </Link>
      </div>
    </>
  );
};

export default HomePage;
