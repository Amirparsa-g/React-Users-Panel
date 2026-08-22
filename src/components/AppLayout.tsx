import { useState } from "react";
import { Outlet } from "react-router-dom";
import hamburgerIcon from "../assets/hamburger-icon.svg";
import DesktopSidebar from "./DesktopSidebar";
import ButtomNav from "./ButtomNav";

const AppLayout = () => {
  const [isHamburger, setIsHamburger] = useState<boolean>(false);
  return (
    <div className="flex w-full h-screen overflow-hidden">
      {!isHamburger && (
        <div className="flex justify-start items-start mt-6.5 mx-2 md:hidden">
          <button onClick={() => setIsHamburger(true)}>
            <img src={hamburgerIcon} alt="hambutger" />
          </button>
        </div>
      )}

      <DesktopSidebar
        isHamburger={isHamburger}
        setIsHamburger={setIsHamburger}
      />
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        <header className="w-full h-10 flex justify-center items-center my-4 shrink-0">
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
