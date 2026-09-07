import homeIcon from "../assets/home.svg";
import usersIcon from "../assets/users.svg";
import addUserIcon from "../assets/add.svg";
import aboutIcon from "../assets/about.svg";
import arrowBackIcon from "../assets/arrow-back.svg";
import { useState } from "react";
import Buttons from "./Buttons";

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

  return (
    <aside
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={` transition-all duration-200 ${!isMobile ? ` ${isHover || isClicked ? " hidden md:aside-notHamburger" : " hidden md:aside-notHamburger md:w-20  "}` : ` md:hidden ${isClicked ? "aside-notHamburger md:aside-notHamburger animate-slide-in" : " aside-notHamburger -translate-x-60 "}`}`}
    >
      <div className="flex gap-2  items-center p-2 ">
        <div className="bg-sidebar-2 p-2 rounded-xl w-10 h-10 flex justify-center items-center border border-white">
          <p className="text-white font-black text-bodyHeader">U</p>
        </div>
        {((!isMobile && (isHover || isClicked)) || (isMobile && isClicked)) && (
          <h2 className="text-body font-black text-white line-clamp-1">
            User Mangement
          </h2>
        )}
      </div>
      <nav className="nav-desktop p-2">
        <Buttons comp="navLink" navigation="/" buttonType="sideNavlink">
          <div className=" wrapper">
            <img src={homeIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) ||
              (isMobile && isClicked)) && (
              <p className="font-bold">Dashboard</p>
            )}
          </div>
        </Buttons>
        <Buttons
          comp="navLink"
          navigation="/users"
          end
          buttonType="sideNavlink"
        >
          <div className="wrapper">
            <img src={usersIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) ||
              (isMobile && isClicked)) && <p className="font-bold">Users</p>}
          </div>
        </Buttons>
        <Buttons
          comp="navLink"
          navigation="/users/new"
          buttonType="sideNavlink"
        >
          <div className="wrapper">
            <img src={addUserIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) ||
              (isMobile && isClicked)) && <p className="font-bold">Add User</p>}
          </div>
        </Buttons>
        <Buttons comp="navLink" navigation="/about" buttonType="sideNavlink">
          <div className="wrapper">
            <img src={aboutIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) ||
              (isMobile && isClicked)) && <p className="font-bold">About</p>}
          </div>
        </Buttons>
      </nav>
      {isClicked && (
        <Buttons
          comp="button"
          buttonType="regular"
          onClick={() => setIsClicked(false)}
          more="fixed bottom-15 md:hidden"
        >
          <img
            src={arrowBackIcon}
            alt="back"
            className="nav-img cursor-pointer"
          />
        </Buttons>
      )}
    </aside>
  );
};

export default DesktopSidebar;
