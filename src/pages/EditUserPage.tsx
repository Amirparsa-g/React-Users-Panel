import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/user";
import type { FormPropType } from "../types/userForm";

const EditUserPage = ({
  UsersList,
  changeInfo,
  selectedUser,
  setSelectedUser,
  isLoading,
  error,
  setIsLoading,
  setError,
}: {
  UsersList: User[];
  changeInfo: (formData: FormPropType, id: number) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  isLoading: boolean;
  error: string | null;
  setIsLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
}) => {
  return (
    <div>
      <AddUserForm
        UsersList={UsersList}
        editUserHandeler={changeInfo}
        user={selectedUser}
        setSelectedUser={setSelectedUser}
        isLoading={isLoading}
        error={error}
        setIsLoading={setIsLoading}
        setError={setError}
      />
    </div>
  );
};

export default EditUserPage;
