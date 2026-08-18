import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import hamburgerIcon from "/Users/AP.Gorji/stage-03/react-user-directory/public/hamburger-icon.svg";
const AppLayout = () => {
  const [isHamburger, setIsHamburger] = useState<boolean>(false);
  return (
    <div className="min-h-1">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <header className="w-full h-10 flex justify-center items-center my-4">
          <h1 className="text-center text-2xl font-semibold">
            User Managment Pannel Project
          </h1>
        </header>
        <span className="sm:hidden">
          <button
            className="block  sm:hidden ml-3"
            onClick={() => setIsHamburger((prev) => !prev)}
          >
            <img src={hamburgerIcon} alt="hamburger icon" />
          </button>
        </span>
        <nav
          className={`${isHamburger ? "flex" : "hidden"} flex-col max-w-fit ml-3 sm:flex sm:flex-row sm:justify-center sm:items-center sm:gap-3 sm:my-4 sm:mx-auto`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 border border-blue-700 p-2 hover:scale-105 text-slate-100 transition-all ease-in-out duration-300 rounded-md"
                : "bg-slate-100 border border-blue-400 p-2 hover:scale-105 transition-all ease-in-out duration-300 rounded-md"
            }
          >
            Home Page
          </NavLink>
          <NavLink
            to="/users"
            end
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 border border-blue-700 p-2 hover:scale-105 text-slate-100 transition-all ease-in-out duration-300 rounded-md"
                : "bg-slate-100 border border-blue-400 p-2 hover:scale-105 transition-all ease-in-out duration-300 rounded-md"
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/users/new"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 border border-blue-700 p-2 hover:scale-105 text-slate-100 transition-all ease-in-out duration-300 rounded-md"
                : "bg-slate-100 border border-blue-400 p-2 hover:scale-105 transition-all ease-in-out duration-300 rounded-md"
            }
          >
            Add User
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 border border-blue-700 p-2 hover:scale-105 text-slate-100 transition-all ease-in-out duration-300 rounded-md"
                : "bg-slate-100 border border-blue-400 p-2 hover:scale-105 transition-all ease-in-out duration-300 rounded-md"
            }
          >
            About Project
          </NavLink>
        </nav>
      </div>
      <main className=" flex flex-col justify-center items-center p-3 min-h-screen">
        <Outlet />
      </main>
      <footer className="border-t-2 border-purple-400 my-5 bg-slate-50 h-50">
        <h2 className="text-center text-3xl text-cyan-400 ">Footer</h2>
      </footer>
    </div>
  );
};

export default AppLayout;
