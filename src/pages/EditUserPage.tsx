import { useNavigate, useParams } from "react-router-dom";
import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/user";
import type { FormPropType } from "../types/userForm";
import { getUserById } from "../services/userApi";
import { useEffect, useState } from "react";
import Buttons from "../components/Buttons";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";
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
          alert(t("common.invalidId"));
          return;
        }
        alert(t("common.userNotFound"));
        navigate("/users");
      }
    };
    void settingUser();
  }, [userId]);

  return (
    <div className="w-full md:w-3/4">
      <header className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">
        <div className="flex flex-col items-start text-left">
          <h2 className="text-header1  font-bold text-3xl text-text-secondary">
            {t("pages.editUser.title")}
          </h2>
          <p className="caption  mt-1">{t("pages.editUser.subtitle")}</p>
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
