import { useNavigate, useParams } from "react-router-dom";
import type { User } from "../types/user";
import type { FormPropType } from "../types/userForm";
import { useEffect, useState } from "react";
import { getUserById } from "../services/userApi";
import Buttons from "../components/Buttons";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";

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
        alert(t("common.invalidId"));
        navigate("/users");
        return;
      }
      const fetchedUser = await setUser();
      if (!fetchedUser) {
        alert(t("common.userNotFound"));
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
        <h2 className="text-danger text-2xl md:text-3xl font-semibold mb-4 text-center break-words w-full">
          {error}
        </h2>
      )}

      <div className="w-full max-w-4xl flex flex-col gap-8 mt-4">
        <header className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex flex-col items-start text-left">
            <h2 className="text-header1  font-bold text-3xl text-text-primary">
              {t("pages.userDetails.title")}
            </h2>
            <p className="caption  mt-1">{t("pages.userDetails.subtitle")}</p>
          </div>
          <Buttons comp="link" buttonType="backTo" navigation="/users">
            <span>
              {isFa && (
                <svg
                  className="fill-[#1f1f1f] fill-text-secondary"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#1f1f1f"
                >
                  <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
                </svg>
              )}
              {!isFa && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z" />
                </svg>
              )}
            </span>{" "}
            {t("common.backToUsers")}
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
            <p className="text-header2 font-extrabold break-all w-full text-2xl text-text-primary">
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
                {t(`form.roles.${clickedUser.role}`)}
              </p>
              <p
                className={clickedUser.isActive ? "active-div" : "inactive-div"}
              >
                {clickedUser.isActive ? t("form.active") : t("form.inactive")}
              </p>
            </div>
          </div>
        </div>

        <div className="userStats-card w-full rounded-xl border  overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="p-5 border-b border-gray-100 sm:border-r">
              <p className="label-form">{t("form.fullName")}</p>
              <p className="text-body font-bold break-all text-text-secondary">
                {clickedUser.fullName}
              </p>
            </div>
            <div className="p-5 border-b border-gray-100">
              <p className="label-form">{t("form.age")}</p>
              <p className="text-body font-bold break-all text-text-secondary">
                {clickedUser.age}
              </p>
            </div>

            <div className="p-5 border-b border-gray-100 sm:border-r">
              <p className="label-form">{t("form.email")}</p>
              <p className="text-body font-bold break-all text-text-secondary">
                {clickedUser.email}
              </p>
            </div>
            <div className="p-5 border-b border-gray-100">
              <p className="label-form">{t("form.role")}</p>
              <p className="text-body font-bold break-all capitalize text-text-secondary">
                {clickedUser.role}
              </p>
            </div>

            <div className="p-5 sm:col-span-2  grid grid-cols-1 md:flex md:flex-nowrap md:justify-end gap-3 w-full">
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
                more="whitespace-nowrap h-fit w-full md:w-fit text-text-primary flex justify-center items-center"
              >
                <p className="text-text-primary">
                  {t("pages.tooltips.changeStatus")}
                </p>
              </Buttons>
              <Buttons
                comp="link"
                aria-disabled={updatingUserId === clickedUser.ID}
                navigation={`/users/${userId}/edit`}
                buttonType="primary"
                more="whitespace-nowrap h-fit w-full md:w-fit text-center"
              >
                {t("pages.tooltips.editUser")}
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
                {t("pages.tooltips.removeUser")}
              </Buttons>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
