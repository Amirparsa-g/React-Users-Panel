import { useEffect } from "react";

import Buttons from "../components/Buttons";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404 | User Management";
  }, []);
  return (
    <div>
      <h2 className="text-[160px] text-center text-gray-400">404</h2>
      <p className="text-xl text-center mt-5">Page Not Found</p>
      <div className="flex justify-evenly items-center mt-30 ">
        <Buttons comp="link" buttonType="backTo" navigation="/users">
          <span>&larr;</span> Back to Users
        </Buttons>
      </div>
    </div>
  );
};

export default NotFoundPage;
