import homeIcon from "../assets/home.svg";
import usersIcon from "../assets/users.svg";
import addUserIcon from "../assets/add.svg";
import aboutIcon from "../assets/about.svg";

import { useState } from "react";
import Buttons from "./Buttons";
import { useTranslation } from "react-i18next";

const DesktopSidebar = ({
  setIsClicked,
  isClicked,
  isMobile,
}: {
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
  isMobile: boolean;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isFa = i18n.language === "fa";

  return (
    <aside
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={` transition-all ${!isMobile ? ` ${isHover || isClicked ? " hidden md:aside-notHamburger" : " hidden md:aside-notHamburger md:w-20  "}` : ` md:hidden ${isClicked ? `aside-notHamburger md:aside-notHamburger ${!isFa ? "animate-slide-in" : "animate-slide-in-fa"}` : " hidden md:aside-notHamburger -translate-x-60 "}`}`}
    >
      <div className="flex gap-2  items-center p-2 ">
        <div className="bg-sidebar-2 p-2 rounded-xl w-10 h-10 flex justify-center items-center border border-white">
          <p className="text-white font-black text-bodyHeader">{t("common.sideBarHeaderIcon")}</p>
        </div>
        {((!isMobile && (isHover || isClicked)) || (isMobile && isClicked)) && (
          <h2 className="text-body font-black text-text-sidebar line-clamp-1">
            {t("common.sideBarHeader")}
          </h2>
        )}
      </div>
      <nav className="nav-desktop p-2">
        <Buttons
          comp="navLink"
          navigation="/"
          buttonType="sideNavlink"
          onClick={() => setIsClicked(false)}
        >
          <div className=" wrapper">
            <img src={homeIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) || (isMobile && isClicked)) && (
              <p className="font-bold text-text-sidebar">{t("navigation.dashboard")}</p>
            )}
          </div>
        </Buttons>
        <Buttons
          onClick={() => setIsClicked(false)}
          comp="navLink"
          navigation="/users"
          end
          buttonType="sideNavlink"
        >
          <div className="wrapper">
            <img src={usersIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) || (isMobile && isClicked)) && (
              <p className="font-bold text-text-sidebar">{t("navigation.users")}</p>
            )}
          </div>
        </Buttons>
        <Buttons
          onClick={() => setIsClicked(false)}
          comp="navLink"
          navigation="/users/new"
          buttonType="sideNavlink"
        >
          <div className="wrapper">
            <img src={addUserIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) || (isMobile && isClicked)) && (
              <p className="font-bold text-text-sidebar">{t("navigation.addUser")}</p>
            )}
          </div>
        </Buttons>
        <Buttons
          comp="navLink"
          navigation="/about"
          buttonType="sideNavlink"
          onClick={() => setIsClicked(false)}
        >
          <div className="wrapper">
            <img src={aboutIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) || (isMobile && isClicked)) && (
              <p className="font-bold text-text-sidebar">{t("navigation.about")}</p>
            )}
          </div>
        </Buttons>
      </nav>
      {isClicked && (
        <Buttons
          comp="button"
          buttonType="primary"
          onClick={() => setIsClicked(false)}
          more="fixed bottom-15 md:hidden bg-primaryDarker border-none"
        >
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
        </Buttons>
      )}
    </aside>
  );
};

export default DesktopSidebar;
