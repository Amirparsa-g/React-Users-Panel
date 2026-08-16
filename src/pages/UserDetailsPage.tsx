import { Link, useNavigate, useParams } from "react-router-dom";
import type { User } from "../types/user";
import type { FormPropType } from "../types/userForm";
import { useEffect, useState } from "react";
import { getUserById } from "../services/userApi";

const UserDetailsPage = ({
  UsersList,
  onRemove,
  changeStatus,
  isLoading,
  setIsLoading,
  error,
  setError,
}: {
  UsersList: User[];
  onRemove: (id: number) => Promise<boolean | undefined>;
  changeStatus: (user: User) => void;
  changeInfo: (formData: FormPropType, id: number) => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  setError: (value: string | null) => void;
  error: string | null;
}) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [clickedUser, setClickedUser] = useState<User | undefined>(undefined);
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);

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
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  useEffect(() => {
    const settingUser = async () => {
      const id = Number(userId);
      if (!userId || !Number.isInteger(id)) {
        alert("Invalid Id");
        navigate("/users");
        return;
      }
      const fetchedUser = await setUser();
      if (!fetchedUser) {
        alert("User Not Found");
        navigate("/users");
      }
    };
    void settingUser();
  }, [userId]);
  useEffect(() => {
    document.title = "User Details | User Management";
  }, []);

  if (isLoading) {
    return (
      <h2 className="text-center text-3xl font-semibold">
        Loading User Details ...
      </h2>
    );
  }

  if (!clickedUser) {
    return null;
  }
  if (isDeleting) {
    return (
      <div className="bg-black/50 backdrop-blur-md h-screen w-full flex justify-center items-center">
        <div className="bg-white w-md fixed border border-black rounded-md h-6/12">
          <h2 className="text-center mt-7 font-semibold text-xl">
            Are you sure you want to continue this action?
          </h2>
          <button
            className="block mx-auto mt-20 border border-green-400 p-3 rounded-md"
            onClick={async () => {
              setUpdatingUserId(clickedUser.ID);
              const isSeccess = await onRemove(clickedUser.ID);
              if (isSeccess) navigate("/users");
              else setIsDeleting(false);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {error && (
        <h2 className="text-red-600 text-3xl font-semibold">{error}</h2>
      )}

      <div className="bg-slate-50 text-center p-2 rounded-2xl mx-4 border border-purple-500 shadow-lg hover:scale-101 ease-in-out duration-200 min-w-md">
        <p>{clickedUser.fullName}</p>
        <p>{clickedUser.age}</p>
        <p>{clickedUser.role}</p>
        <p>{clickedUser.email}</p>
        <p>{clickedUser.isActive ? "Active" : "inActive"}</p>
        <div className="flex justify-center gap-4">
          <button
            disabled={updatingUserId === clickedUser.ID}
            onClick={async () => {
              setIsDeleting(true);
            }}
            className="text-white bg-red-500 p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300  border-2 border-red-700"
          >
            remove
          </button>
          <button
            disabled={updatingUserId === clickedUser.ID}
            onClick={async () => {
              setUpdatingUserId(clickedUser.ID);
              await changeStatus(clickedUser);
              setUpdatingUserId(null);
              setClickedUser((prev) =>
                prev ? { ...prev, isActive: !prev.isActive } : prev,
              );
            }}
            className="bg-purple-400 text-white p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300 border-2 border-purple-700"
          >
            change status
          </button>
          <Link
            aria-disabled={updatingUserId === clickedUser.ID}
            to={`/users/${userId}/edit`}
            className="bg-orange-400 text-white p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300 border-2 border-orange-700"
          >
            Edit
          </Link>
        </div>
      </div>

      <Link
        to="/users"
        className="mt-2 border border-purple-400 p-2 rounded-md hover:scale-105 tramsition-all ease-in-out duration-300"
      >
        go back to users page
      </Link>
    </div>
  );
};

export default UserDetailsPage;
