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
          className="w-fit mt-12 mb-10 self-center sm:self-start sm:ml-4"
        >
          <span className="flex items-center gap-1 text-black font-medium hover:opacity-70 transition-opacity">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
