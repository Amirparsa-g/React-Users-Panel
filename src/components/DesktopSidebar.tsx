import { NavLink } from "react-router-dom";
import homeIcon from "../assets/home.svg";
import usersIcon from "../assets/users.svg";
import addUserIcon from "../assets/add.svg";
import aboutIcon from "../assets/about.svg";
import arrowBackIcon from "../assets/arrow-back.svg";
import { useState } from "react";
import logoIcon from "../assets/logo.svg";
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
      <div className="flex gap-2">
        <img src={logoIcon} alt="logoIcon" className="nav-img" />
        {((!isMobile && (isHover || isClicked)) || (isMobile && isClicked)) && (
          <h2 className="text-body font-header2 text-white line-clamp-1">
            User Mangement
          </h2>
        )}
      </div>
      <nav className="nav-desktop">
        <NavLink
          onClick={() => setIsClicked(false)}
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-btn-selected" : "nav-btn-notSelected"
          }
        >
          <div className=" wrapper">
            <img src={homeIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) ||
              (isMobile && isClicked)) && <p>Home</p>}
          </div>
        </NavLink>
        <NavLink
          to="/users"
          onClick={() => setIsClicked(false)}
          end
          className={({ isActive }) =>
            isActive ? "nav-btn-selected" : "nav-btn-notSelected"
          }
        >
          <div className="wrapper">
            <img src={usersIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) ||
              (isMobile && isClicked)) && <p>Users</p>}
          </div>
        </NavLink>
        <NavLink
          to="/users/new"
          onClick={() => setIsClicked(false)}
          className={({ isActive }) =>
            isActive ? "nav-btn-selected" : "nav-btn-notSelected"
          }
        >
          <div className="wrapper">
            <img src={addUserIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) ||
              (isMobile && isClicked)) && <p>Add User</p>}
          </div>
        </NavLink>
        <NavLink
          to="/about"
          onClick={() => setIsClicked(false)}
          className={({ isActive }) =>
            isActive ? "nav-btn-selected" : "nav-btn-notSelected"
          }
        >
          <div className="wrapper">
            <img src={aboutIcon} alt="Home" className="nav-img" />
            {((!isMobile && (isHover || isClicked)) ||
              (isMobile && isClicked)) && <p>About</p>}
          </div>
        </NavLink>
      </nav>
      {isClicked && (
        <button
          onClick={() => setIsClicked(false)}
          className="fixed bottom-15 md:hidden"
        >
          <img src={arrowBackIcon} alt="back" className="nav-img" />
        </button>
      )}
    </aside>
  );
};

export default DesktopSidebar;
