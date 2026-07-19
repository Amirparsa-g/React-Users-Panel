import { useState } from "react";
import "./App.css";
import UserList from "./components/UserList";
import type { User } from "./types/user";
import users from "./data/users";
import Searchinput from "./components/Searchinput";
import UserStats from "./components/UserStats";

function App() {
  const [UsersList, setUserList] = useState<User[]>(users);
  const [searchedTerm, setSearchTerm] = useState("");
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
    const UsersIds: number[] = UsersList.map((user) => user.ID);
    if (UsersIds.includes(id)) {
      const remainingUsers = UsersList.filter((user) => user.ID !== id);
      setUserList(remainingUsers);
      alert("user removed seccessfully");
    } else alert("there are no users with this id");
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
    if (searchTerm.trim() === "") setUserList(users);
    else {
      const searchedUser = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase().trim()),
      );

      setUserList(searchedUser);
    }
  };
  const allUsers = UsersList.length;
  const ActiveUsers = UsersList.filter((user) => user.isActive === true).length;
  const InActiveUsers = UsersList.filter(
    (user) => user.isActive === false,
  ).length;
  let content;
  if (UsersList.length === 0 && searchedTerm.trim() === "")
    content = (
      <div className="flex justify-center h-110 items-center text-5xl">
        <p className="text-center">هنوز کاربری در لیست وجود ندارد</p>
      </div>
    );
  else if (UsersList.length === 0) {
    content = (
      <div className="flex justify-center h-110 items-center text-5xl">
        <p className="text-center">کاربری با این اسم پیدا نشده</p>
      </div>
    );
  } else
    content = (
      <UserList
        users={UsersList}
        onRemove={removeUserHandler}
        changeStatus={ChangeStatusHandler}
      />
    );

  return (
    <>
      <Searchinput onSearchChange={SearchUser} />
      {content}
      <button
        onClick={() => addUserHandler(newUser)}
        className="bg-slate-50 block m-auto mt-5 border border-purple-500 p-3 rounded-2xl hover:scale-105 ease-in-out duration-300 mb-3"
      >
        Add New User
      </button>
      <UserStats
        allUsers={allUsers}
        ActiveUsers={ActiveUsers}
        InActiveUsers={InActiveUsers}
      />
    </>
  );
}

export default App;
