import { useEffect } from "react";
import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/user";

const AddUserPage = ({
  addUserHandeler,
  setIsFormVisible,
  UsersList,
  setSelectedUser,
}: {
  addUserHandeler: (newUser: User) => void;
  setIsFormVisible: (value: boolean) => void;
  UsersList: User[];
  user?: User | null;
  setSelectedUser: (user: User | null) => void;
}) => {
  useEffect(() => {
    document.title = "Add User | User Management";
  }, []);
  return (
    <AddUserForm
      setIsFormVisible={setIsFormVisible}
      addUserHandeler={addUserHandeler}
      UsersList={UsersList}
      setSelectedUser={setSelectedUser}
    />
  );
};

export default AddUserPage;
