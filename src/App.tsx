import { useEffect, useState } from "react";
import "./App.css";
//import UserList from "./components/UserList";
import { type User } from "./types/user";

import HomePage from "./pages/HomePage";

// import users from "./data/users";
//import EmptyState from "./components/EmptyState";
import type { FormPropType } from "./types/userForm";
import { Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import AddUserPage from "./pages/AddUserPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import AppLayout from "./components/AppLayout";
import { getUsers } from "./services/userApi";

type Filters = "active" | "inactive" | "all";
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [UsersList, setUserList] = useState<User[]>(users);
  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError("");
      const apiUsers = await getUsers();
      setUsers(apiUsers);
      setUserList(apiUsers);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Unexpected Error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const load = async () => {
      await loadUsers();
    };
    load();
  }, []);

  console.log(users);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [searchedTerm, setSearchTerm] = useState("");
  const [status, setUserStatus] = useState<Filters>("all");
  const [isFormVisible, setIsFormVisible] = useState(false);
  console.log(UsersList);
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
    const role = formData.role;

    if (role === "") return;

    const changedUsers: User[] = UsersList.map((user) => {
      if (user.ID !== id) return user;

      return {
        ...user,
        fullName: formData.fullName.trim(),
        age: Number(formData.age),
        role,
        isActive: formData.isActive,
        email: formData.email.trim() || undefined,
      };
    });

    setUserList(changedUsers);
    setIsFormVisible(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    document.title = `User Managment -${UsersList.length} Users`;
  }, [UsersList.length]);

  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage UsersList={UsersList} />}></Route>
          <Route path="users">
            <Route
              index
              element={
                <UsersPage
                  UsersList={UsersList}
                  searchedTerm={searchedTerm}
                  SearchUser={SearchUser}
                  status={status}
                  setUserStatus={setUserStatus}
                  removeUserHandler={removeUserHandler}
                  ChangeStatusHandler={ChangeStatusHandler}
                  isLoading={isLoading}
                  error={error}
                  LoadUser={loadUsers}
                />
              }
            ></Route>
            <Route
              path="new"
              element={
                <AddUserPage
                  setSelectedUser={setSelectedUser}
                  addUserHandeler={addUserHandler}
                  UsersList={UsersList}
                  setIsLoading={setIsLoading}
                  setError={setError}
                  isLoading={isLoading}
                  error={error}
                />
              }
            ></Route>
            <Route
              path=":userId"
              element={
                <UserDetailsPage
                  UsersList={UsersList}
                  onRemove={removeUserHandler}
                  changeStatus={ChangeStatusHandler}
                  setSelectedUser={setSelectedUser}
                  isFormVisible={isFormVisible}
                  selectedUser={selectedUser}
                  changeInfo={changeInfo}
                  setError={setError}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  error={error}
                />
              }
            ></Route>
          </Route>

          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
