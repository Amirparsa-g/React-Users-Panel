import { NavLink } from "react-router-dom";
import homeIcon from "../assets/home.svg";
import usersIcon from "../assets/users.svg";
import addUserIcon from "../assets/add.svg";
import aboutIcon from "../assets/about.svg";
import arrowBackIcon from "../assets/arrow-back.svg";
const DesktopSidebar = ({
  isHamburger,
  setIsHamburger,
}: {
  isHamburger: boolean;
  setIsHamburger: (value: boolean) => void;
}) => {
  return (
    <aside
      className={`${isHamburger ? "aside-hamburger md:aside-notHamburger" : "aside-notHamburger"}`}
    >
      <h2 className="text-body font-header2 text-white">User Mangement</h2>
      <nav className="nav-desktop">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-btn-selected" : "nav-btn-notSelected"
          }
        >
          <div className="flex gap-1">
            <img src={homeIcon} alt="Home" className="nav-img" />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink
          to="/users"
          end
          className={({ isActive }) =>
            isActive ? "nav-btn-selected" : "nav-btn-notSelected"
          }
        >
          <div className="flex gap-1">
            <img src={usersIcon} alt="Home" className="nav-img" />
            <p>Users</p>
          </div>
        </NavLink>
        <NavLink
          to="/users/new"
          className={({ isActive }) =>
            isActive ? "nav-btn-selected" : "nav-btn-notSelected"
          }
        >
          <div className="flex gap-1">
            <img src={addUserIcon} alt="Home" className="nav-img" />
            <p>Add User</p>
          </div>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-btn-selected" : "nav-btn-notSelected"
          }
        >
          <div className="flex gap-1">
            <img src={aboutIcon} alt="Home" className="nav-img" />
            <p>About</p>
          </div>
        </NavLink>
      </nav>
      {isHamburger && (
        <button
          onClick={() => setIsHamburger(false)}
          className="fixed bottom-15"
        >
          <img src={arrowBackIcon} alt="back" className="nav-img" />
        </button>
      )}
    </aside>
  );
};

export default DesktopSidebar;
