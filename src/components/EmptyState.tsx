import { useTranslation } from "react-i18next";
import Buttons from "./Buttons";

const EmptyState = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col userStats-card border border-dotted w-full">
      <p className="text-small font-bold text-text-primary">
        {t("pages.empty.title")}
      </p>
      <p className="caption mb-5">{t("pages.empty.message")}</p>
      <Buttons
        buttonType="primary"
        comp="link"
        navigation={"/users/new"}
        className="primary-button p-2 w-fit"
      >
        {t("pages.users.usersPageAddUserButton")}
      </Buttons>
    </div>
  );
};

export default EmptyState;
