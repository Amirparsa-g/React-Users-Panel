import { useNavigate, useParams } from "react-router-dom";
import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/user";
import type { FormPropType } from "../types/userForm";
import { getUserById } from "../services/userApi";
import { useEffect, useState } from "react";

const EditUserPage = ({
  UsersList,
  changeInfo,
  isLoading,
  error,
  setIsLoading,
  setError,
}: {
  UsersList: User[];
  changeInfo: (formData: FormPropType, id: number) => void;
  isLoading: boolean;
  error: string | null;
  setIsLoading: (value: boolean) => void;
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
    <div>
      {clickedUser && (
        <AddUserForm
          key={clickedUser.ID}
          UsersList={UsersList}
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
