import { useState } from "react";
import "./App.css";
import UserList from "./components/UserList";
import type { User } from "./types/user";
import users from "./data/users";
import Searchinput from "./components/Searchinput";
import UserStats from "./components/UserStats";
import EmptyState from "./components/EmptyState";

type Filters = "active" | "inactive" | "all";
function App() {
  const [UsersList, setUserList] = useState<User[]>(users);
  const [searchedTerm, setSearchTerm] = useState("");
  const [status, setUserStatus] = useState<Filters>("all");
  const newUser: User = {
    ID: 7,
    fullName: "کاربر آزمایشی",
    age: 27,
    role: "operator",
    isActive: true,
    email: "test.user@example.com",
  };
  const addUserHandler = (newUser: User) => {
    const isAvailable = UsersList.find((user) => user.ID === newUser.ID);
    if (isAvailable) alert("you cant add the same user twice");
    else {
      setUserList([...UsersList, newUser]);
      alert("user Added Successfully");
    }
  };
  const removeUserHandler = (id: number) => {
    const remainingUsers = UsersList.filter((user) => user.ID !== id);
    setUserList(remainingUsers);
    alert("user removed seccessfully");
  };
  const ChangeStatusHandler = (id: number) => {
    const toggleUser = UsersList.map((user) => {
      if (user.ID === id) return { ...user, isActive: !user.isActive };
      return user;
    });
    setUserList(toggleUser);
  };
  const SearchUser = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };
  const allUsers = UsersList;
  const ActiveUsers = UsersList.filter((user) => user.isActive);
  const InActiveUsers = UsersList.filter((user) => !user.isActive);
  const searchedUsers = UsersList.filter((user) => {
    const term = searchedTerm.toLowerCase().trim();
    return user.fullName.toLowerCase().includes(term);
  });

  const displayedUsers: User[] = searchedUsers.filter((user) => {
    if (status === "all") return true;
    else if (status === "inactive") return !user.isActive;
    return user.isActive;
  });
  let content;
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
      />
    );
  }
  return (
    <>
      <Searchinput onSearchChange={SearchUser} value={searchedTerm} />
      {content}
      <button
        onClick={() => addUserHandler(newUser)}
        className="bg-slate-50 block m-auto mt-5 border border-purple-500 p-3 rounded-2xl hover:scale-105 ease-in-out duration-300 mb-3 w-35"
      >
        Add New User
      </button>
      <div className="flex items-center">
        <button
          onClick={() => setUserStatus("active")}
          className="bg-slate-50 block m-auto mt-5 border border-green-500 p-3 rounded-2xl hover:scale-105 ease-in-out duration-300 mb-3 w-35"
        >
          active
        </button>
        <button
          onClick={() => setUserStatus("inactive")}
          className="bg-slate-50 block m-auto mt-5 border border-red-500 p-3 rounded-2xl hover:scale-105 ease-in-out duration-300 mb-3 w-35"
        >
          inactive
        </button>
        <button
          onClick={() => setUserStatus("all")}
          className="bg-slate-50 block m-auto mt-5 border border-blue-500 p-3 rounded-2xl hover:scale-105 ease-in-out duration-300 mb-3 w-35"
        >
          all
        </button>
      </div>
      <UserStats
        allUsers={allUsers.length}
        ActiveUsers={ActiveUsers.length}
        InActiveUsers={InActiveUsers.length}
      />
    </>
  );
}

export default App;
