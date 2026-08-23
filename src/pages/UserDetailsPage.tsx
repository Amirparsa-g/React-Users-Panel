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
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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
      <h2 className="text-center text-3xl font-semibold px-4">
        Loading User Details ...
      </h2>
    );
  }

  if (!clickedUser) {
    return null;
  }

  if (isDeleting) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-md bg-white/30 h-screen w-full flex justify-center items-center px-4">
        <div className="userStats-card w-full max-w-md p-6">
          <h2 className="text-center font-semibold text-xl">
            Are you sure you want to continue this action?
          </h2>
          <button
            className="block mx-auto success-button w-full mt-10"
            onClick={async () => {
              setUpdatingUserId(clickedUser.ID);
              const isSeccess = await onRemove(clickedUser.ID);
              if (isSeccess) navigate("/users");
              else setIsDeleting(false);
            }}
          >
            Continue
          </button>
          <button
            className="danger-button mx-auto block w-full mt-2"
            onClick={() => setIsDeleting(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full px-4 overflow-x-hidden box-border pb-10">
      {error && (
        <h2 className="text-red-600 text-2xl md:text-3xl font-semibold mb-4 text-center break-words w-full">
          {error}
        </h2>
      )}

      <div className="flex flex-col gap-6 w-full max-w-xl mt-4">
        <div className="flex flex-col sm:flex-row justify-start items-center sm:items-start gap-4 w-full">
          <div className="flex justify-center items-center w-20 h-20 rounded-full border border-black shrink-0">
            <p className="text-center text-2xl uppercase">
              {clickedUser.fullName[0]}
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left overflow-hidden w-full">
            <p className="text-header1 font-header1 break-all w-full">
              {clickedUser.fullName}
            </p>

            <div className="flex gap-2">
              <p
                className={
                  clickedUser.isActive
                    ? "bg-success/10 text-success w-fit rounded-md px-2"
                    : "bg-danger/10 text-danger w-fit rounded-md px-2"
                }
              >
                {clickedUser.isActive ? "active" : "inactive"}
              </p>
              <p
                className={
                  clickedUser.role === "admin"
                    ? "bg-admin/10 text-admin w-fit rounded-md px-2"
                    : clickedUser.role === "operator"
                      ? "bg-moderator/10 text-moderator rounded-md w-fit px-2"
                      : "bg-black/10 text-black w-fit rounded-md px-2"
                }
              >
                {clickedUser.role}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 userStats-card w-full p-4">
          <p className="text-black/50">Age</p>
          <p className="text-body font-header2 break-all">{clickedUser.age}</p>
          <hr className="sm:hidden col-span-1 border-gray-200" />

          <p className="text-black/50">Role</p>
          <p className="text-body font-header2 break-all">{clickedUser.role}</p>
          <hr className="sm:hidden col-span-1 border-gray-200" />

          <p className="text-black/50">Email</p>
          <p className="text-body font-header2 break-all">
            {clickedUser.email}
          </p>
        </div>

        <div className="flex justify-center sm:justify-start gap-3 flex-wrap w-full mt-2">
          <button
            disabled={updatingUserId === clickedUser.ID}
            onClick={async () => {
              setIsDeleting(true);
            }}
            className="danger-button flex-1 sm:flex-none min-w-30"
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
            className="neutral-button flex-1 sm:flex-none min-w-30"
          >
            change status
          </button>
          <Link
            aria-disabled={updatingUserId === clickedUser.ID}
            to={`/users/${userId}/edit`}
            className="warning-button text-black text-center flex-1 sm:flex-none min-w-[120px]"
          >
            Edit
          </Link>
        </div>
      </div>

      <Link
        to="/users"
        className="w-fit mt-12 mb-10 self-center sm:self-start sm:ml-4"
      >
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

export default UserDetailsPage;
