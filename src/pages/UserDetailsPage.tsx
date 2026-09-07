import { Link, useNavigate, useParams } from "react-router-dom";
import type { User } from "../types/user";
import type { FormPropType } from "../types/userForm";
import { useEffect, useState } from "react";
import { getUserById } from "../services/userApi";
import Buttons from "../components/Buttons";

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
          <Buttons
            comp="button"
            buttonType="primary"
            more="w-full my-3"
            onClick={async () => {
              setUpdatingUserId(clickedUser.ID);
              const isSeccess = await onRemove(clickedUser.ID);
              if (isSeccess) navigate("/users");
              else setIsDeleting(false);
            }}
          >
            Continue
          </Buttons>
          <Buttons
            comp="button"
            buttonType="danger"
            more="w-full"
            onClick={() => setIsDeleting(false)}
          >
            Cancel
          </Buttons>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full px-4 overflow-x-hidden box-border pb-10">
      {error && (
        <h2 className="text-danger text-2xl md:text-3xl font-semibold mb-4 text-center break-words w-full">
          {error}
        </h2>
      )}

      <div className="w-full max-w-4xl flex flex-col gap-8 mt-4">
        <header className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex flex-col items-start text-left">
            <h2 className="text-header1  font-bold text-3xl">User Details</h2>
            <p className="caption text-black/50 mt-1">
              View and manage the selected user.
            </p>
          </div>
          <Link
            to="/users"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl bg-white text-black font-medium hover:bg-gray-50 transition-colors"
          >
            <span>&larr;</span> Back to Users
          </Link>
        </header>

        <div className="flex justify-start gap-4 w-full">
          <div
            className={`flex justify-center items-center w-20 h-20 rounded-full border shrink-0 ${clickedUser.role === "admin" ? "admin-div" : clickedUser.role === "operator" ? "moderator-div" : "customer-div"}`}
          >
            <p className="text-center text-3xl font-bold uppercase">
              {clickedUser.fullName[0]}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-2 sm:items-start overflow-hidden w-full">
            <p className="text-header2 font-extrabold break-all w-full text-2xl">
              {clickedUser.fullName}
            </p>

            <div className="flex gap-2">
              <p
                className={
                  clickedUser.role === "admin"
                    ? "bg-admin/10 text-admin font-bold w-fit rounded-xl px-3 py-1 text-sm"
                    : clickedUser.role === "operator"
                      ? "bg-moderator/10 text-moderator font-bold rounded-xl w-fit px-3 py-1 text-sm"
                      : "bg-black/10 text-black font-bold w-fit rounded-xl px-3 py-1 text-sm"
                }
              >
                {clickedUser.role}
              </p>
              <p
                className={
                  clickedUser.isActive
                    ? "bg-success/10 text-success font-bold w-fit rounded-xl px-3 py-1 text-sm"
                    : "bg-danger/10 text-danger font-bold w-fit rounded-xl px-3 py-1 text-sm"
                }
              >
                {clickedUser.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>

        <div className="userStats-card w-full rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="p-5 border-b border-gray-100 sm:border-r">
              <p className="text-black/50 text-sm font-semibold mb-1">
                Full Name
              </p>
              <p className="text-body font-bold break-all">
                {clickedUser.fullName}
              </p>
            </div>
            <div className="p-5 border-b border-gray-100">
              <p className="text-black/50 text-sm font-semibold mb-1">Age</p>
              <p className="text-body font-bold break-all">{clickedUser.age}</p>
            </div>

            <div className="p-5 border-b border-gray-100 sm:border-r">
              <p className="text-black/50 text-sm font-semibold mb-1">Email</p>
              <p className="text-body font-bold break-all">
                {clickedUser.email}
              </p>
            </div>
            <div className="p-5 border-b border-gray-100">
              <p className="text-black/50 text-sm font-semibold mb-1">Role</p>
              <p className="text-body font-bold break-all capitalize">
                {clickedUser.role}
              </p>
            </div>

            <div className="p-5 sm:col-span-2 flex flex-wrap sm:flex-nowrap items-center justify-end gap-3 w-full">
              <Buttons
                comp="button"
                disabled={updatingUserId === clickedUser.ID}
                onClick={async () => {
                  setUpdatingUserId(clickedUser.ID);
                  await changeStatus(clickedUser);
                  setUpdatingUserId(null);
                  setClickedUser((prev) =>
                    prev ? { ...prev, isActive: !prev.isActive } : prev,
                  );
                }}
                buttonType="neutral"
                more="whitespace-nowrap h-fit"
              >
                Change Status
              </Buttons>
              <Link
                aria-disabled={updatingUserId === clickedUser.ID}
                to={`/users/${userId}/edit`}
                className="primary-button text-center flex-1 sm:flex-none flex items-center justify-center px-4 py-2 whitespace-nowrap h-fit"
              >
                Edit User
              </Link>
              <Buttons
                comp="button"
                disabled={updatingUserId === clickedUser.ID}
                onClick={async () => {
                  setIsDeleting(true);
                }}
                buttonType="danger"
              >
                Delete User
              </Buttons>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
