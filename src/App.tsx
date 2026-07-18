import { useState } from "react";
// import UserList from "./components/UserList";
import { users } from "./data/users";
import type { User } from "./types/user";
import "./App.css";
import UserList from "./components/UserList";

function App() {
  const [userList, setUserList] = useState<User[]>(users);
  function userAddHandler() {
    const newUser: User = {
      ID: 7,
      fullName: "کاربر آزمایشی",
      age: 27,
      role: "operator",
      isActive: true,
      email: "test.user@example.com",
    };
    if (userList.some((user) => user.ID === newUser.ID))
      alert("this user alredy exists");
    setUserList([...userList, newUser]);
    alert("user added successfully");
  }
  return (
    <div className="flex bg-amber-200">
      <UserList users={users} />
      <button onClick={userAddHandler}>click</button>
    </div>
  );
}

export default App;
