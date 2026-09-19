import { useTranslation } from "react-i18next";
import Buttons from "../components/Buttons";
const LanguageToggleButton = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  return (
    <Buttons
      comp="button"
      buttonType="neutral"
      more="rounded-full w-9 h-9 sm:w-10 sm:h-10 p-0 flex items-center justify-center text-xs sm:text-sm font-bold uppercase text-text-primary mx-5"
      onClick={() => {
        if (i18n.language === "fa") i18n.changeLanguage("en");
        else i18n.changeLanguage("fa");
      }}
    >
      {i18n.language === "fa" && (
        <div className="cursor-pointer relative group flex items-center justify-center border-none w-fit shadow-none p-0 ">
          <p>EN</p>

          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-surface-elevated text-text-primary text-xs px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap z-50">
            {t("common.switchToEnglish")}
          </div>
        </div>
      )}
      {i18n.language !== "fa" && (
        <div className="cursor-pointer relative group flex items-center justify-center border-none w-fit shadow-none p-0 ">
          <p>FA</p>

          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-surface-elevated text-text-primary text-xs px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap z-50">
            {t("common.switchToFarsi")}
          </div>
        </div>
      )}
    </Buttons>
  );
};

export default LanguageToggleButton;
