import { useEffect } from "react";

import Buttons from "../components/Buttons";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "404 | User Management";
  }, []);
  return (
    <div className="userStats-card w-full">
      <h2 className="text-[160px] text-center text-gray-400">404</h2>
      <p className="text-xl font-bold text-center mt-5 text-text-primary">
        {t("pages.notFound.message")}
      </p>
      <div className="flex justify-evenly items-center mt-30 ">
        <Buttons comp="link" buttonType="backTo" navigation="/users">
          <span>&larr;</span> {t("common.backToUsers")}
        </Buttons>
      </div>
    </div>
  );
};

export default NotFoundPage;
