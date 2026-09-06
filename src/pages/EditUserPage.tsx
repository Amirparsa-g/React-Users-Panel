import { Link, useNavigate, useParams } from "react-router-dom";
import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/user";
import type { FormPropType } from "../types/userForm";
import { getUserById } from "../services/userApi";
import { useEffect, useState } from "react";

const EditUserPage = ({
  UsersList,
  onRemove,
  changeInfo,
  isLoading,
  error,
  setIsLoading,
  setError,
}: {
  UsersList: User[];
  changeInfo: (
    formData: FormPropType,
    id: number,
  ) => Promise<boolean | undefined>;
  isLoading: boolean;
  error: string | null;
  setIsLoading: (value: boolean) => void;
  onRemove: (id: number) => Promise<boolean | undefined>;
  setError: (value: string | null) => void;
}) => {
  const [clickedUser, setClickedUser] = useState<User | undefined>(undefined);
  const { userId } = useParams();
  const navigate = useNavigate();
  const setUser = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userIds: number[] = UsersList.map((user: User) => user.ID);
      const user = userIds.includes(Number(userId))
        ? UsersList.find((user) => user.ID === Number(userId))
        : await getUserById(Number(userId));
      setClickedUser(user);
      return user;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Unexpected Error");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const settingUser = async () => {
      const fetchedUser = await setUser();
      if (!fetchedUser) {
        const id = Number(userId);
        if (!userId || !Number.isInteger(id)) {
          navigate("/users");
          alert("Invalid Id");
          return;
        }
        alert("User Not Found");
        navigate("/users");
      }
    };
    void settingUser();
  }, [userId]);
  return (
    <div className="w-full md:w-3/4">
      <header className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">
        <div className="flex flex-col items-start text-left">
          <h2 className="text-header1  font-bold text-3xl">Edit User</h2>
          <p className="caption text-black/50 mt-1">
            Update the existing user information.
          </p>
        </div>
        <Link
          to="/users"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-black font-medium hover:bg-gray-50 transition-colors"
        >
          <span>&larr;</span> Back to Users
        </Link>
      </header>
      {clickedUser && (
        <AddUserForm
          key={clickedUser.ID}
          UsersList={UsersList}
          onRemove={onRemove}
          editUserHandeler={changeInfo}
          user={clickedUser}
          isLoading={isLoading}
          error={error}
          setIsLoading={setIsLoading}
          setError={setError}
        />
      )}
    </div>
  );
};

export default EditUserPage;
