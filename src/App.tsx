import { useState } from "react";
import "./App.css";
import UserList from "./components/UserList";
import type { User } from "./types/user";
import users from "./data/users";
function App() {
  const [UsersList, setUserList] = useState<User[]>(users);
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

  return (
    <>
      <UserList
        users={UsersList}
        onRemove={removeUserHandler}
        changeStatus={ChangeStatusHandler}
      />
      <button
        onClick={() => addUserHandler(newUser)}
        className="bg-slate-50 block m-auto mt-5 border border-purple-500 p-3 rounded-2xl"
      >
        Add New User
      </button>
    </>
  );
}

export default App;
