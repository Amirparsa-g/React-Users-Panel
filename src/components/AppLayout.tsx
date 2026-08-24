import { useState } from "react";
import { Outlet } from "react-router-dom";
import DesktopSidebar from "./DesktopSidebar";
import ButtomNav from "./ButtomNav";

const AppLayout = () => {
  const [isHamburger, setIsHamburger] = useState<boolean>(false);
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div
        className={
          isHamburger
            ? "fixed inset-0 z-40 bg-black/50 w-full h-screen md:hidden transition-opacity"
            : "hidden"
        }
        onClick={() => setIsHamburger(false)}
      ></div>
      <div>
        <DesktopSidebar
          isHamburger={isHamburger}
          setIsHamburger={setIsHamburger}
        />
      </div>
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        <header className="w-full h-10 flex justify-center items-center my-4 shrink-0 gap-5">
          {!isHamburger && (
            <span className="mt-2.5 ml-1 md:hidden">
              <button onClick={() => setIsHamburger(true)}>
                <svg
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
          <h1 className="text-center text-2xl font-semibold">
            User Managment Pannel Project
          </h1>
        </header>

        <main className=" flex flex-1 flex-col justify-start items-center p-3 w-full overflow-y-auto mb-10">
          <Outlet />
        </main>
      </div>
      <ButtomNav />
    </div>
  );
};

export default AppLayout;
