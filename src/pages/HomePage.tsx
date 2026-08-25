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
    <div>
      <UserStats
        isLoading={isLoading}
        allUsers={allUsers.length}
        Admins={Admins.length}
        Moderators={moderators.length}
        Customers={customers.length}
      />
      <div className="flex flex-col justify-center items-center userStats-card">
        <h2 className="text-header2 font-header2">About Project</h2>
        <p className="mt-10">
          This is a User's managment project built with vite , react ,
          TypeScript and tailwind CSS.
          <br />
          The APIs witch are used in this Project are from DummyJson and the
          Project has the features for adding new users,editing their status or
          information and removing them.
          <br />
          You can also visit the stats of the Users in the boxes above or at the
          users page.
          <br />
          Also you can go to the users page or add user page and add a user by
          using the buttons in the sidebar or bottom navigation.
          <br />
          Since the APIs witch are being used in this project are fake APIs ,
          the changes that you apply to the whole list of the users will be gone
          by refreshing the page.
          <br />
          You can read a more detailed paragraph about the features of this
          project at the <Link to={"/about"}>About Page</Link>.
          <br />
          Also you can visit my{" "}
          <a href="https://github.com/Amirparsa-g">github</a> for simillar
          projects.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
