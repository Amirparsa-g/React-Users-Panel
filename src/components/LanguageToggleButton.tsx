import { useTranslation } from "react-i18next";
import Buttons from "../components/Buttons";
const LanguageToggleButton = () => {
  const { i18n } = useTranslation();
  return (
    <Buttons
      comp="button"
      buttonType="neutral"
      onClick={() => {
        if (i18n.language === "fa") i18n.changeLanguage("en");
        else i18n.changeLanguage("fa");
        console.log(i18n.language);
      }}
    >
      <p>{i18n.language === "fa" ? "fa" : "en"}</p>
    </Buttons>
  );
};

export default LanguageToggleButton;
