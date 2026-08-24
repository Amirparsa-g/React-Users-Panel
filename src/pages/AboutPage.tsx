import { useEffect } from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About | User Management";
  }, []);
  return (
    <div className="lg:px-10">
      <h2 className="text-2xl font-semibold">the purpose of this project :</h2>
      <p className="text-xl mt-2 mb-4">
        the purpose of this project is learning about react fundamentals (witch
        we did in stage 3) , learning about forms and validation (Done on stage
        4) , learning about routes (this stage) and learning about using react
        in general
      </p>
      <h2 className="text-2xl font-semibold">
        the fitures of this project up until now :{" "}
      </h2>
      <p className="text-xl mt-2 mb-4">
        In this project I have implemented a User Managment panel with the
        ability to ad users using forms , removing users , editing them and
        searching among the users through deferent filters . In the latest
        version of the projects I have added routers for moving through pages
        without refreshing the entire application for a better User interface
      </p>
      <h2 className="text-2xl font-semibold">
        The tools used in this project:
      </h2>
      <p className="text-xl mt-2 mb-4">
        this project was build using vite and I have used react framwork and
        typescript for proggramming this application and I have Used Tailwind
        css for the design of the application
      </p>
      <h2 className="text-2xl font-semibold">
        in what state is this project on right now?
      </h2>
      <p className="text-xl mt-2 mb-4">
        Aty the moment the project is on stage 5 : react routers
      </p>
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
  );
};

export default AboutPage;
