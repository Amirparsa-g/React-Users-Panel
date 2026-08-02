import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404 | User Management";
  }, []);
  return (
    <div>
      <h2 className="text-[160px] text-center text-gray-400">404</h2>
      <p className="text-xl text-center mt-5">Page Not Found</p>
      <div className="flex justify-evenly items-center mt-30 ">
        <Link
          to="/"
          className="bg-slate-100 border border-blue-400 p-2 hover:scale-105 transition-all ease-in-out duration-300 rounded-md"
        >
          Home
        </Link>
        <Link
          to="/users"
          className="bg-slate-100 border border-blue-400 p-2 hover:scale-105 transition-all ease-in-out duration-300 rounded-md"
        >
          Users
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
