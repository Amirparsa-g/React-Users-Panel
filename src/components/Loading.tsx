import { useTranslation } from "react-i18next";

const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col userStats-card border border-dotted w-full">
      <p className="text-small font-bold mb-5 text-text-primary">{t("common.loading")}</p>
      <div className="skeleton"></div>
      <div className="skeleton"></div>
    </div>
  );
};

export default Loading;
