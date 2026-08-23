import { useEffect } from "react";
import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/user";
import { Link } from "react-router-dom";

const AddUserPage = ({
  addUserHandeler,
  setIsLoading,
  setError,
  UsersList,
  isLoading,
  error,
}: {
  addUserHandeler: (newUser: User) => void;
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
    <div>
      <AddUserForm
        addUserHandeler={addUserHandeler}
        UsersList={UsersList}
        setIsLoading={setIsLoading}
        setError={setError}
        isLoading={isLoading}
        error={error}
      />
      <Link to="/users" className="flex justify-center items-center mt-10">
        <span className="flex items-center gap-1 text-black font-medium hover:opacity-70 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
          Back to Users
        </span>
      </Link>
    </div>
  );
};

export default AddUserPage;
