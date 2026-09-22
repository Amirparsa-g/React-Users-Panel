import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DesktopSidebar from "./DesktopSidebar";
import ButtomNav from "./ButtomNav";
import { motion } from "framer-motion";
import ScrollToTop from "./ScrollToTop";
import Buttons from "./Buttons";

import ThemeToggleButton from "./ThemeToggleButton";
import LanguageToggleButton from "./LanguageToggleButton";
import { useTranslation } from "react-i18next";
const AppLayout = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <ScrollToTop />
      <div
        className={
          isClicked
            ? "fixed inset-0 z-40 bg-black/50 w-full h-screen md:hidden transition-opacity"
            : "hidden"
        }
        onClick={() => setIsClicked(false)}
      ></div>
      <div>
        <DesktopSidebar isMobile={true} isClicked={isClicked} setIsClicked={setIsClicked} />
        <DesktopSidebar isMobile={false} isClicked={isClicked} setIsClicked={setIsClicked} />
      </div>
      <div className=" flex flex-1 flex-col h-full  ">
        <header
          className={`shrink-0 w-full h-14 sm:h-16 flex items-center justify-between gap-2 px-3 sm:px-4 bg-surface z-10 ${isFa ? "flex-row" : ""}`}
        >
          {!isClicked && (
            <Buttons
              comp="button"
              buttonType="secondary"
              more="w-fit px-1 border-none shadow-none bg-surface"
              onClick={() => setIsClicked(true)}
            >
              <svg
                className="h-5 w-5 cursor-pointer fill-text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </Buttons>
          )}
          {isClicked && (
            <Buttons
              comp="button"
              buttonType="secondary"
              more="w-fit px-1 border-none shadow-none bg-surface"
              onClick={() => setIsClicked(false)}
            >
              <svg
                className="h-5 w-5 cursor-pointer fill-text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </Buttons>
          )}

          <h1
            className={`flex-1 truncate px-2 text-sm font-black sm:text-body text-text-primary ${isFa ? "text-right" : ""}`}
          >
            {t("common.sideBarHeader")}
          </h1>

          <div className="flex items-center gap-1 sm:gap-2">
            <Buttons comp="link" navigation={"/users/new"} more="w-fit" buttonType="primary">
              <span className="sm:hidden text-text-primary">+</span>
              <span className="hidden sm:inline text-white">
                {t("pages.users.usersPageAddUserButton")}
              </span>
            </Buttons>
            <ThemeToggleButton />
            <LanguageToggleButton />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto bg-bg">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" flex flex-1 flex-col justify-start items-center p-3 w-full  mb-10 mx-auto px-4 max-w-screen-2xl bg-bg"
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
      <ButtomNav />
    </div>
  );
};

export default AppLayout;
