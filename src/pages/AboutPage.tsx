import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "About | User Management";
  }, []);
  return (
    <>
      <h2 className="text-header2 font-bold w-full ">
        {t("pages.about.title")}
      </h2>
      <p className="caption w-full mb-7">{t("pages.about.subtitle")}</p>

      <div className="flex flex-col userStats-card">
        <h2 className="text-bodyHeader font-bold">
          {t("pages.about.purpose")}
        </h2>
        <p className="text-text-secondary">{t("pages.about.purposeText")}</p>
        <br />
        <h2 className="text-bodyHeader font-bold mb-3">
          {t("pages.about.features")}
        </h2>
        <ul className="list-disc pl-5 space-y-3 text-text-secondary">
          <li>{t("pages.about.featureList.loadUsers")}</li>
          <li>{t("pages.about.featureList.searchFilter")}</li>
          <li>{t("pages.about.featureList.addEditView")}</li>
          <li>{t("pages.about.featureList.statusDelete")}</li>
          <li>{t("pages.about.featureList.states")}</li>
          <li>{t("pages.about.featureList.responsive")}</li>
        </ul>
        <h2 className="text-bodyHeader font-bold my-3">
          {t("pages.about.stageFocus")}
        </h2>
        <p className="text-text-secondary">{t("pages.about.stageText")}</p>
      </div>
    </>
  );
};

export default AboutPage;
