import { useTranslation } from "react-i18next";
import Buttons from "../components/Buttons";
const LanguageToggleButton = () => {
  const { i18n } = useTranslation();
  return (
    <Buttons
      comp="button"
      buttonType="neutral"
      more="rounded-full w-9 h-9 sm:w-10 sm:h-10 p-0 flex items-center justify-center text-xs sm:text-sm font-bold uppercase text-text-primary"
      onClick={() => {
        if (i18n.language === "fa") i18n.changeLanguage("en");
        else i18n.changeLanguage("fa");
        console.log(i18n.language);
      }}
    >
      {i18n.language === "fa" ? "EN" : "FA"}
    </Buttons>
  );
};

export default LanguageToggleButton;
