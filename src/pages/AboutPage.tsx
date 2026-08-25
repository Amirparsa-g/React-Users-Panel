import { useEffect } from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About | User Management";
  }, []);
  return (
    <div className="flex flex-col userStats-card">
      <h2 className="text-header2 font-header2">
        The purpose of this project :
      </h2>
      <p className="text-body mb-5">
        The purpose of this project is to learn about react fundamentals (stage
        3) , about forms and validations (stage 4) , about react routers (stage
        5) , about API calling ,requests and responses (stage 6) and learning
        about tailwind css at stage 7
      </p>
      <h2 className="text-header2 font-header2">
        The features of this project :{" "}
      </h2>
      <p className="text-body mb-5">
        This project is a User Managment panel witch gets the users from
        DummyJson fake APIs and has the ability to Edit the users , Add a user
        or removing them from the main list of users. The panel has a responsive
        design witch tries to have a good user experience among all devices.
      </p>
      <h2 className="text-header2 font-header2">
        The tools used in this project:
      </h2>
      <p className="text-body mb-5">
        This project was built using vite , react , typescript and tailwind css
      </p>
      <h2 className="text-header2 font-header2">
        in what state is this project on right now?
      </h2>
      <p className="text-body mb-5">
        At the moment the project is on stage 8 : Admin-dashboard-UI
      </p>
      <Link
        to="/
        "
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
