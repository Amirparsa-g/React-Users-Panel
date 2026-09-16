import { useTranslation } from "react-i18next";
import Buttons from "./Buttons";

const UserError = ({ LoadUser }: { LoadUser: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col userStats-card border border-dotted w-full">
      <p className="text-small font-bold">{t("common.error")}</p>
      <p className="caption mb-5">{t("pages.errors.userError")} </p>
      <Buttons
        comp="button"
        onClick={LoadUser}
        buttonType="neutral"
        more="dark:text-white"
      >
        {t("common.retry")}
      </Buttons>
    </div>
  );
};

export default UserError;
