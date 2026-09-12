import { useState } from "react";
import { Outlet } from "react-router-dom";
import DesktopSidebar from "./DesktopSidebar";
import ButtomNav from "./ButtomNav";
import { motion } from "framer-motion";
import ScrollToTop from "./ScrollToTop";
import Buttons from "./Buttons";
const AppLayout = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

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
      <div className=" flex flex-1 flex-col h-full  ">
        <header className="shrink-0 w-full h-20 flex justify-between items-center  z-10 gap-5 bg-white">
          {!isClicked && (
            <span className="absolute left-2 md:left-22">
              <Buttons
                comp="button"
                buttonType="secondary"
                more="w-fit border-none shadow-none"
                onClick={() => setIsClicked(true)}
              >
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
              </Buttons>
            </span>
          )}
          {isClicked && (
            <span className="absolute md:left-62 ">
              <Buttons
                comp="button"
                buttonType="secondary"
                more="w-fit border-none shadow-none"
                onClick={() => setIsClicked(false)}
              >
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
              </Buttons>
            </span>
          )}

          <h1 className="text-body font-black block mx-auto">User Managment</h1>
          <Buttons
            comp="link"
            navigation={"/users/new"}
            more="fixed top-5 right-3 md:hidden w-fit"
            buttonType="primary"
          >
            +
          </Buttons>
          <Buttons
            comp="link"
            navigation={"/users/new"}
            more="hidden fixed top-5 right-3 md:flex w-fit"
            buttonType="primary"
          >
            + Add User
          </Buttons>
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
