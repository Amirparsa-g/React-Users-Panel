import { useEffect, useState } from "react";
import "../src/i18n/index";
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
import {
  deleteApiUser,
  editApiUserStatus,
  getUsers,
  sendEditedUser,
} from "./services/userApi";
import EditUserPage from "./pages/EditUserPage";
import ScrollToTop from "./components/ScrollToTop";
import ThemeProvider from "./Contexts/ThemeProvider";
import { useTranslation } from "react-i18next";

type StatusFilters = "active" | "inactive" | "all";
type RoleFilters = "admin" | "operator" | "customer" | "all";
function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [UsersList, setUserList] = useState<User[]>([]);
  const { t } = useTranslation();
  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError("");
      const apiUsers = await getUsers();
      setUserList(apiUsers);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(t("pages.errors.unexpected"));
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

  const [searchedTerm, setSearchTerm] = useState("");
  const [status, setUserStatus] = useState<StatusFilters>("all");
  const [role, setRole] = useState<RoleFilters>("all");

  const addUserHandler = (newUser: User) => {
    const isAvailable = UsersList.find((user) => user.ID === newUser.ID);
    if (isAvailable) alert(t("form.errors.addUserError"));
    else {
      setUserList([...UsersList, newUser]);
      alert(t("form.errors.addUserSuccess"));
    }
  };
  const removeUserHandler = (id: number) => {
    const remainingUsers = UsersList.filter((user) => user.ID !== id);
    setUserList(remainingUsers);
  };
  const removeApiUser = async (id: number) => {
    try {
      setError(null);
      if (confirm(t("common.userRemovingConfirm"))) {
        const deleteResponse = await deleteApiUser(id);
        if (deleteResponse.isDeleted) removeUserHandler(id);
        return true;
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(t("pages.errors.unexpected"));
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const ChangeStatusHandler = async (ediitingUser: User) => {
    try {
      setError(null);
      const editedUser = await editApiUserStatus(ediitingUser);
      const toggleUser = UsersList.map((user) => {
        if (user.ID === editedUser.ID)
          return {
            ...user,
            isActive: editedUser.isActive,
          };
        return user;
      });
      setUserList(toggleUser);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(t("pages.errors.unexpected"));
    } finally {
      setIsLoading(false);
    }
  };
  const SearchUser = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const changeInfo = async (formData: FormPropType, id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const role = formData.role;
      if (role === "") return;
      const updatedUser = await sendEditedUser(formData, id);
      setUserList((currentUsers) =>
        currentUsers.map((user) =>
          user.ID === updatedUser.ID ? updatedUser : user,
        ),
      );
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(t("pages.errors.unexpected"));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const { i18n } = useTranslation();
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    localStorage.setItem("lng", currentLang);
    document.documentElement.dir = currentLang === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={<HomePage UsersList={UsersList} isLoading={isLoading} />}
          ></Route>
          <Route path="users">
            <Route
              index
              element={
                <UsersPage
                  setSearchTerm={setSearchTerm}
                  UsersList={UsersList}
                  searchedTerm={searchedTerm}
                  SearchUser={SearchUser}
                  status={status}
                  role={role}
                  setRole={setRole}
                  setUserStatus={setUserStatus}
                  removeUserHandler={removeApiUser}
                  ChangeStatusHandler={ChangeStatusHandler}
                  isLoading={isLoading}
                  error={error}
                  LoadUser={loadUsers}
                  setIsLoading={setIsLoading}
                  setError={setError}
                />
              }
            ></Route>
            <Route
              path="new"
              element={
                <AddUserPage
                  addUserHandeler={addUserHandler}
                  UsersList={UsersList}
                  onRemove={removeApiUser}
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
                  onRemove={removeApiUser}
                  changeStatus={ChangeStatusHandler}
                  changeInfo={changeInfo}
                  setError={setError}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  error={error}
                />
              }
            ></Route>
            <Route
              path=":userId/edit"
              element={
                <EditUserPage
                  UsersList={UsersList}
                  onRemove={removeApiUser}
                  changeInfo={changeInfo}
                  isLoading={isLoading}
                  error={error}
                  setIsLoading={setIsLoading}
                  setError={setError}
                />
              }
            ></Route>
          </Route>

          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
