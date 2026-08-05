import { useEffect } from "react";
import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/user";

const AddUserPage = ({
  addUserHandeler,

  UsersList,
  setSelectedUser,
}: {
  addUserHandeler: (newUser: User) => void;

  UsersList: User[];
  user?: User | null;
  setSelectedUser: (user: User | null) => void;
}) => {
  useEffect(() => {
    document.title = "Add User | User Management";
  }, []);
  return (
    <AddUserForm
      addUserHandeler={addUserHandeler}
      UsersList={UsersList}
      setSelectedUser={setSelectedUser}
    />
  );
};

export default AddUserPage;
