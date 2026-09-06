import { useEffect } from "react";
import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/user";
import { Link } from "react-router-dom";

const AddUserPage = ({
  addUserHandeler,
  onRemove,
  setIsLoading,
  setError,
  UsersList,
  isLoading,
  error,
}: {
  addUserHandeler: (newUser: User) => void;
  onRemove: (id: number) => Promise<boolean | undefined>;
  setIsLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
  UsersList: User[];
  user?: User | null;
  isLoading: boolean;
  error: string | null;
}) => {
  useEffect(() => {
    document.title = "Add User | User Management";
  }, []);
  return (
    <div className="w-full md:w-3/4">
      <header className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">
        <div className="flex flex-col items-start text-left">
          <h2 className="text-header1  font-bold text-3xl">Add User</h2>
          <p className="caption text-black/50 mt-1">Create a new user</p>
        </div>
        <Link
          to="/users"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-black font-medium hover:bg-gray-50 transition-colors"
        >
          <span>&larr;</span> Back to Users
        </Link>
      </header>
      <AddUserForm
        addUserHandeler={addUserHandeler}
        UsersList={UsersList}
        setIsLoading={setIsLoading}
        setError={setError}
        isLoading={isLoading}
        error={error}
        onRemove={onRemove}
      />
    </div>
  );
};

export default AddUserPage;
