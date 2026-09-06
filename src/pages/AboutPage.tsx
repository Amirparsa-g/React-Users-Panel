import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About | User Management";
  }, []);
  return (
    <>
      <h2 className="text-header2 font-bold w-full ">About</h2>
      <p className="caption w-full mb-7">
        A short description of the training project.
      </p>

      <div className="flex flex-col userStats-card">
        <h2 className="text-bodyHeader font-bold">Purpose</h2>
        <p className="text-gray-600">
          This project is a user management training application built with
          Vite, React, TypeScript and Tailwind CSS. The current UI is expected
          to remain connected to the existing project logic and API.
        </p>
        <br />
        <h2 className="text-bodyHeader font-bold mb-3">Current features</h2>
        <ul className="list-disc pl-5 space-y-3 text-gray-600">
          <li>Load and display users</li>
          <li>Search and filter users</li>
          <li>Add, edit and view a user</li>
          <li>Change user status and delete a user</li>
          <li>Handle loading, error and empty states</li>
          <li>Responsive layout for mobile and desktop</li>
        </ul>
        <h2 className="text-bodyHeader font-bold my-3">Stage 09 focus</h2>
        <p className="text-gray-600">
          Rebuild the supplied static design inside the existing React
          application while preserving the current business logic and explaining
          every responsive and component decision during review.
        </p>
      </div>
    </>
  );
};

export default AboutPage;
