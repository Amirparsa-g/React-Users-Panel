import { useNavigate, useParams } from "react-router-dom";
import type { User } from "../types/user";
import type { FormPropType } from "../types/userForm";
import { useEffect, useState } from "react";
import { getUserById } from "../services/userApi";
import Buttons from "../components/Buttons";
import Loading from "../components/Loading";

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
      <div>
        <Loading />
      </div>
    );
  }

  if (!clickedUser) {
    return null;
  }

  return (
    <div className="flex flex-col items-center w-full px-4 overflow-x-hidden box-border pb-10">
      {error && (
        <h2 className="text-danger dark:text-danger-darkMode text-2xl md:text-3xl font-semibold mb-4 text-center break-words w-full">
          {error}
        </h2>
      )}

      <div className="w-full max-w-4xl flex flex-col gap-8 mt-4">
        <header className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex flex-col items-start text-left">
            <h2 className="text-header1  font-bold text-3xl dark:text-text-primary-darkMode">
              User Details
            </h2>
            <p className="caption  mt-1">View and manage the selected user.</p>
          </div>
          <Buttons comp="link" buttonType="backTo" navigation="/users">
            <span>&larr;</span> Back to Users
          </Buttons>
        </header>

        <div className="flex justify-start gap-4 w-full">
          <div
            className={`flex justify-center items-center w-20 h-20 rounded-full border shrink-0 ${clickedUser.role === "admin" ? "admin-div" : clickedUser.role === "operator" ? "operator-div" : "customer-div"}`}
          >
            <p className="text-center text-3xl font-bold uppercase">
              {clickedUser.fullName[0]}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-2 sm:items-start overflow-hidden w-full">
            <p className="text-header2 font-extrabold break-all w-full text-2xl dark:text-text-primary-darkMode">
              {clickedUser.fullName}
            </p>

            <div className="flex gap-2">
              <p
                className={
                  clickedUser.role === "admin"
                    ? "admin-div"
                    : clickedUser.role === "operator"
                      ? "operator-div"
                      : "customer-div"
                }
              >
                {clickedUser.role}
              </p>
              <p
                className={clickedUser.isActive ? "active-div" : "inactive-div"}
              >
                {clickedUser.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>

        <div className="userStats-card w-full rounded-xl border  overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="p-5 border-b border-gray-100 dark:border-border-darkMode sm:border-r">
              <p className="label-form">Full Name</p>
              <p className="text-body font-bold break-all dark:text-text-secondary-darkMode">
                {clickedUser.fullName}
              </p>
            </div>
            <div className="p-5 border-b border-gray-100 dark:border-border-darkMode">
              <p className="label-form">Age</p>
              <p className="text-body font-bold break-all dark:text-text-secondary-darkMode">
                {clickedUser.age}
              </p>
            </div>

            <div className="p-5 border-b border-gray-100 dark:border-border-darkMode sm:border-r">
              <p className="label-form">Email</p>
              <p className="text-body font-bold break-all dark:text-text-secondary-darkMode">
                {clickedUser.email}
              </p>
            </div>
            <div className="p-5 border-b border-gray-100 dark:border-border-darkMode">
              <p className="label-form">Role</p>
              <p className="text-body font-bold break-all capitalize dark:text-text-secondary-darkMode">
                {clickedUser.role}
              </p>
            </div>

            <div className="p-5 sm:col-span-2  grid grid-cols-2 md:flex md:flex-nowrap md:justify-end gap-3 w-full">
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
                more="whitespace-nowrap h-fit w-full md:w-fit dark:text-text-primary-darkMode"
              >
                Change Status
              </Buttons>
              <Buttons
                comp="link"
                aria-disabled={updatingUserId === clickedUser.ID}
                navigation={`/users/${userId}/edit`}
                buttonType="primary"
                more="whitespace-nowrap h-fit w-full md:w-fit text-center"
              >
                Edit User
              </Buttons>
              <Buttons
                comp="button"
                disabled={updatingUserId === clickedUser.ID}
                onClick={async () => {
                  setUpdatingUserId(clickedUser.ID);
                  const isSeccess = await onRemove(clickedUser.ID);
                  if (isSeccess) navigate("/users");
                }}
                buttonType="danger"
                more="whitespace-nowrap h-fit w-full md:w-fit col-span-2"
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
