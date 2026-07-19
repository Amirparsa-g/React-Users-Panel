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
  return (
    <>
      <UserList users={UsersList} />
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
