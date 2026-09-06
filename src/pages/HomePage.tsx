import { Link } from "react-router-dom";
import UserStats from "../components/UserStats";
import type { User } from "../types/user";
import { useEffect } from "react";

const HomePage = ({
  UsersList,
  isLoading,
}: {
  UsersList: User[];
  isLoading: boolean;
}) => {
  const allUsers = UsersList;
  const Admins = UsersList.filter((user) => user.role === "admin");
  const moderators = UsersList.filter((user) => user.role === "operator");
  const customers = UsersList.filter((user) => user.role === "customer");
  useEffect(() => {
    document.title = "Home | User Management";
  }, []);
  return (
    <div className="mb-10">
      <h1 className="text-header2 font-header1">Dashboard</h1>
      <p className="caption">
        A quick overview of the current users in the system.
      </p>
      <UserStats
        isLoading={isLoading}
        allUsers={allUsers.length}
        Admins={Admins.length}
        Moderators={moderators.length}
        Customers={customers.length}
      />
      <div className="flex flex-col lg:flex-row gap-7 w-full">
        <div className="flex flex-col userStats-card lg:w-8/12">
          <h2 className="text-bodyHeader font-black">Project Overview</h2>
          <p className="caption">An overview of this Project</p>
          <p className="mt-10 nutText">
            This project manages users loaded from the existing API. The UI
            should make the main operations easy to find without changing the
            existing API, mapper, validation, routing, or state logic.
            <br />
            <br />
            The reference focuses on a consistent visual system: shared spacing,
            buttons, form fields, status badges, desktop table, mobile list, and
            visible interaction states.
          </p>
        </div>

        <div className="flex flex-col userStats-card lg:w-4/12">
          <h1 className="text-bodyHeader font-black">Quick Actions</h1>
          <p className="caption">Project Actions</p>
          <div className="flex flex-col gap-2 mt-4">
            <Link to={"/users"} className="HomePage-Link">
              View users
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
              </svg>
            </Link>

            <Link to={"/users/new"} className="HomePage-Link">
              Add a user
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
              </svg>
            </Link>
            <Link to={"/about"} className="HomePage-Link">
              About project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
