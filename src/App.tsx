import { useEffect, useState } from "react";
import "./App.css";
import UserList from "./components/UserList";
import { type User } from "./types/user";

import users from "./data/users";
import Searchinput from "./components/Searchinput";
import UserStats from "./components/UserStats";
import EmptyState from "./components/EmptyState";
import AddUserForm from "./components/AddUserForm";
import type { FormPropType } from "./types/userForm";

type Filters = "active" | "inactive" | "all";
function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [UsersList, setUserList] = useState<User[]>(users);
  const [searchedTerm, setSearchTerm] = useState("");
  const [status, setUserStatus] = useState<Filters>("all");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const addUserHandler = (newUser: User) => {
    const isAvailable = UsersList.find((user) => user.ID === newUser.ID);
    if (isAvailable) alert("you cant add the same user twice");
    else {
      setUserList([...UsersList, newUser]);
      setIsFormVisible(false);
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

  const changeInfo = (formData: FormPropType, id: number) => {
    const changedUsers = UsersList.map((user) => {
      if (user.ID === id) {
        return {
          ...user,
          fullName: formData.fullName,
          age: parseInt(formData.age),
          role: formData.role,
          isActive: formData.isActive,
          email: formData.email,
        };
      }
      return user;
    });
    setUserList(changedUsers);
    setIsFormVisible(false);
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

  useEffect(() => {
    document.title = `User Managment -${UsersList.length} Users`;
  }, [UsersList.length]);

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
        setSelectedUser={setSelectedUser}
        setIsFormVisible={setIsFormVisible}
      />
    );
  }
  return (
    <>
      <Searchinput onSearchChange={SearchUser} value={searchedTerm} />
      {content}
      <button
        onClick={() => setIsFormVisible(true)}
        className="bg-slate-50 block m-auto mt-5 border border-purple-500 p-3 rounded-2xl hover:scale-105 ease-in-out duration-300 mb-3 w-35"
      >
        Add New User
      </button>
      {isFormVisible && (
        <AddUserForm
          setIsFormVisible={setIsFormVisible}
          addUserHandeler={addUserHandler}
          UsersList={UsersList}
          editUserHandeler={changeInfo}
          user={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
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
