import { useEffect } from "react";

import Buttons from "../components/Buttons";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";
  useEffect(() => {
    document.title = t("titles.notFound");
  }, [t]);
  return (
    <div className="userStats-card w-full">
      <h2 className="text-[160px] text-center text-gray-400">404</h2>
      <p className="text-xl font-bold text-center mt-5 text-text-primary">
        {t("pages.notFound.message")}
      </p>
      <div className="flex justify-evenly items-center mt-30 ">
        <Buttons comp="link" buttonType="backTo" navigation="/users">
          <span>
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
      </div>
    </div>
  );
};

export default NotFoundPage;
