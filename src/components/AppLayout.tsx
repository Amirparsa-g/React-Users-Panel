import { Outlet, NavLink } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <header className="w-full h-10 flex justify-center items-center">
        <h1 className="text-center">User Managment Pannel Project</h1>
      </header>
      <nav className="flex justify-center gap-3 m-4">
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
      <main>
        <Outlet />
      </main>
      <footer>
        <p>footer</p>
      </footer>
    </>
  );
};

export default AppLayout;
