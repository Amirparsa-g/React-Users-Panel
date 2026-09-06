import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DesktopSidebar from "./DesktopSidebar";
import ButtomNav from "./ButtomNav";
import { motion } from "framer-motion";
import ScrollToTop from "./ScrollToTop";
const AppLayout = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <div className="flex w-full h-screen overflow-hidden ">
      <ScrollToTop />
      <div
        className={
          isClicked
            ? "fixed inset-0 z-40 bg-black/50 w-full h-screen md:hidden transition-opacity "
            : "hidden"
        }
        onClick={() => setIsClicked(false)}
      ></div>
      <div>
        <DesktopSidebar
          isMobile={true}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
        />
        <DesktopSidebar
          isMobile={false}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
        />
      </div>
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        <header className="relative w-full h-10 flex justify-between items-center mذ-4 shrink-0 gap-5 bg-white">
          {!isClicked && (
            <span className="absolute left-2">
              <button onClick={() => setIsClicked(true)}>
                <svg
                  className="cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#1f1f1f"
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              </button>
            </span>
          )}
          {isClicked && (
            <span className="absolute left-2">
              <button onClick={() => setIsClicked(false)}>
                <svg
                  className="cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#1f1f1f"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </span>
          )}

          <h1 className="text-body font-black block mx-auto">User Managment</h1>
          <Link to={"/users/new"} className="fixed top-5 right-3 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
              className="bg-primary w-8 h-8 rounded-md shadow-sm hover:bg-primaryDark p-1.5"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </Link>
          <Link
            to={"/users/new"}
            className="hidden md:flex fixed top-5 right-3 "
          >
            <div className="primary-button flex p-2 w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ffffff"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
              <p className="ml-2">Add User</p>
            </div>
          </Link>
        </header>

        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" flex flex-1 flex-col justify-start items-center p-3 w-full overflow-y-auto mb-10 mx-auto px-4 max-w-screen-2xl bg-bg"
        >
          <Outlet />
        </motion.main>
      </div>
      <ButtomNav />
    </div>
  );
};

export default AppLayout;
