import { useEffect } from "react";
import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/user";

const AddUserPage = ({
  addUserHandeler,
  setIsLoading,
  setError,
  UsersList,
  setSelectedUser,
  isLoading,
  error,
}: {
  addUserHandeler: (newUser: User) => void;
  setIsLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
  UsersList: User[];
  user?: User | null;
  setSelectedUser: (user: User | null) => void;
  isLoading: boolean;
  error: string | null;
}) => {
  useEffect(() => {
    document.title = "Add User | User Management";
  }, []);
  return (
    <AddUserForm
      addUserHandeler={addUserHandeler}
      UsersList={UsersList}
      setSelectedUser={setSelectedUser}
      setIsLoading={setIsLoading}
      setError={setError}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default AddUserPage;
