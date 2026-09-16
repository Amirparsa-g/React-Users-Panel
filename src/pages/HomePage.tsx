import UserStats from "../components/UserStats";
import type { User } from "../types/user";
import { useEffect } from "react";
import Buttons from "../components/Buttons";
import { useTranslation } from "react-i18next";

const HomePage = ({
  UsersList,
  isLoading,
}: {
  UsersList: User[];
  isLoading: boolean;
}) => {
  const allUsers = UsersList;
  const activeUsers = UsersList.filter((user) => user.isActive);
  const inactiveUsers = UsersList.filter((user) => !user.isActive);
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "Home | User Management";
  }, []);
  return (
    <div className="mb-10">
      <h1 className="text-header2 font-header1 text-text-primary">
        {t("pages.dashboard.title")}
      </h1>
      <p className="caption">{t("pages.dashboard.subtitle")}</p>

      <UserStats
        isLoading={isLoading}
        allUsers={allUsers.length}
        activeUsers={activeUsers.length}
        inactiveUsers={inactiveUsers.length}
      />
      <div className="flex flex-col lg:flex-row gap-7 w-full">
        <div className="flex flex-col userStats-card lg:w-8/12">
          <h2 className="text-bodyHeader font-black text-text-primary">
            {t("pages.home.projectOverview")}
          </h2>
          <p className="caption">
            {t("pages.home.projectOverviewDiscription")}
          </p>
          <p className="mt-10 nutText">
            {t("pages.home.projectDescription")}
            <br />
            <br />
            {t("pages.home.implementationNote")}
          </p>
        </div>

        <div className="flex flex-col userStats-card lg:w-4/12">
          <h1 className="text-bodyHeader font-black text-text-primary">
            {t("pages.home.quickActions")}
          </h1>
          <p className="caption">{t("pages.home.quickActionsCaption")}</p>
          <div className="flex flex-col gap-2 mt-4">
            <Buttons
              comp="link"
              navigation={"/users"}
              buttonType="HomePageLink"
            >
              {t("pages.home.actions.viewUsers")}
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
            </Buttons>

            <Buttons
              comp="link"
              navigation={"/users/new"}
              buttonType="HomePageLink"
            >
              {t("pages.home.actions.addUser")}
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
            </Buttons>
            <Buttons
              comp="link"
              navigation={"/about"}
              buttonType="HomePageLink"
            >
              {t("pages.home.actions.aboutProject")}
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
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
