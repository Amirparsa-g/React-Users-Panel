import { useEffect, useState } from "react";
import "./App.css";
//import UserList from "./components/UserList";
import { type User } from "./types/user";

import HomePage from "./pages/HomePage";

import users from "./data/users";
//import EmptyState from "./components/EmptyState";
import type { FormPropType } from "./types/userForm";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";
import AddUserPage from "./pages/AddUserPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import AppLayout from "./components/AppLayout";

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

  useEffect(() => {
    document.title = `User Managment -${UsersList.length} Users`;
  }, [UsersList.length]);

  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage UsersList={UsersList} />}></Route>
          <Route
            path="/users"
            element={
              <UserPage
                UsersList={UsersList}
                setUserList={setUserList}
                searchedTerm={searchedTerm}
                SearchUser={SearchUser}
                status={status}
                setUserStatus={setUserStatus}
              />
            }
          ></Route>
          <Route
            path="/users/new"
            element={
              <AddUserPage
                setSelectedUser={setSelectedUser}
                addUserHandeler={addUserHandler}
                UsersList={UsersList}
                setIsFormVisible={setIsFormVisible}
              />
            }
          ></Route>
          <Route
            path="/users/:id"
            element={
              <UserDetailsPage
                UsersList={UsersList}
                onRemove={removeUserHandler}
                changeStatus={ChangeStatusHandler}
                setSelectedUser={setSelectedUser}
                setIsFormVisible={setIsFormVisible}
                isFormVisible={isFormVisible}
                selectedUser={selectedUser}
                changeInfo={changeInfo}
              />
            }
          ></Route>

          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
