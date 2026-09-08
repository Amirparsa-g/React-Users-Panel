// import React from "react";

const UserStats = ({
  allUsers,
  activeUsers,
  inactiveUsers,
  isLoading,
}: {
  allUsers: number;
  activeUsers: number;
  inactiveUsers: number;

  isLoading: boolean;
}) => {
  return (
    <div className="my-3 grid grid-col-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="userStats-card relative">
        <h2 className="text-small font-header1 text-black/70">Total Users</h2>
        <div className="stats-content">
          {!isLoading && (
            <h3 className="text-header2 font-black">{allUsers}</h3>
          )}
          <p className="caption">All users currently loaded</p>
          {isLoading && (
            <>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
            </>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#2563eb"
          className="statsCard-svg "
        >
          <path d="M40-160v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v92H40Zm440-160q-38 0-72-17.5T351-386q-17-25-42.5-39.5T253-440q22-37 93-58.5T480-520q63 0 134 21.5t93 58.5q-29 0-55 14.5T609-386q-22 32-56 49t-73 17ZM160-440q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440ZM480-560q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-680q0 50-34.5 85T480-560Z" />
        </svg>
      </div>
      <div className="userStats-card relative">
        <h2 className="text-small font-header1 text-black/70">Active Users</h2>
        <div className="stats-content ">
          {!isLoading && (
            <h3 className="text-header2 font-black">{activeUsers}</h3>
          )}
          <p className="caption">Users with active status</p>
          {isLoading && (
            <>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
            </>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#2563eb"
          className="statsCard-svg"
        >
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
      </div>
      <div className="userStats-card relative">
        <h2 className="text-small font-header1 text-black/70">
          Inactive Users
        </h2>
        <div className="stats-content ">
          {!isLoading && (
            <h3 className="text-header2 font-black">{inactiveUsers}</h3>
          )}
          <p className="caption">Users with inactive status</p>
          {isLoading && (
            <>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
            </>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#2563eb"
          className="statsCard-svg"
        >
          <path d="M240-440v-80h480v80H240Z" />
        </svg>
      </div>
    </div>
  );
};

export default UserStats;
