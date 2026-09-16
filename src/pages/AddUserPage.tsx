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
  useEffect(() => {
    document.title = "Add User | User Management";
  }, []);
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
          <span>&larr;</span> {t("common.backToUsers")}
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
