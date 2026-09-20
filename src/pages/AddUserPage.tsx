import { useEffect } from "react";
import AddUserForm from "../components/AddUserForm";
import type { User } from "../types/user";

import Buttons from "../components/Buttons";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";
  useEffect(() => {
    document.title = t("titles.addUser");
  }, [t]);
  return (
    <div className="w-full md:w-3/4">
      <header className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">
        <div className="flex flex-col items-start text-left">
          <h2 className="text-header1  font-bold text-3xl text-text-primary">
            {t("pages.addUser.title")}
          </h2>
          <p className="caption  mt-1">{t("pages.addUser.subtitle")}</p>
        </div>
        <Buttons comp="link" buttonType="backTo" navigation="/users">
          <span>
            {" "}
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
