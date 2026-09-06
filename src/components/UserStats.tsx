// import React from "react";

const UserStats = ({
  allUsers,
  Admins,
  Moderators,
  Customers,
  isLoading,
}: {
  allUsers: number;
  Admins: number;
  Moderators: number;
  Customers: number;
  isLoading: boolean;
}) => {
  console.log(isLoading);
  return (
    <div className="my-3 grid grid-col-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="userStats-card relative">
        <h2 className="text-small font-header1 text-black/70">All Users</h2>
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
        <h2 className="text-small font-header1 text-black/70">Admins</h2>
        <div className="stats-content ">
          {!isLoading && <h3 className="text-header2 font-black">{Admins}</h3>}
          <p className="caption">Users with Admin role</p>
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
          <path d="M380.5-480.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm-70 523q-34 8-65 22 29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8q-36 0-70 8Z" />
        </svg>
      </div>
      <div className="userStats-card relative">
        <h2 className="text-small font-header1 text-black/70">Moderators</h2>
        <div className="stats-content ">
          {!isLoading && (
            <h3 className="text-header2 font-black">{Moderators}</h3>
          )}
          <p className="caption">Users with Operator role</p>
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
          <path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440ZM331.5-411.5Q320-423 320-440t11.5-28.5Q343-480 360-480t28.5 11.5Q400-457 400-440t-11.5 28.5Q377-400 360-400t-28.5-11.5Zm240 0Q560-423 560-440t11.5-28.5Q583-480 600-480t28.5 11.5Q640-457 640-440t-11.5 28.5Q617-400 600-400t-28.5-11.5ZM241-462q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z" />
        </svg>
      </div>
      <div className="userStats-card relative">
        <h2
          className="text-small font-header1 text-black/70
        "
        >
          Customers
        </h2>
        <div className="stats-content ">
          {!isLoading && (
            <h3 className="text-header2 font-black">{Customers}</h3>
          )}
          <p className="caption">Users with Customer role</p>
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
          <path d="M381-481q-41-41-41-99t41-99q41-41 99-41t99 41q41 41 41 99t-41 99q-41 41-99 41t-99-41Zm141.5-56.5Q540-555 540-580t-17.5-42.5Q505-640 480-640t-42.5 17.5Q420-605 420-580t17.5 42.5Q455-520 480-520t42.5-17.5ZM480-60 120-280v-400l360-220 360 220v400L480-60Zm0-93 147-91q-34-18-71.5-27t-75.5-9q-38 0-75.5 9T333-244l147 91ZM256-291q50-34 107-51.5T480-360q60 0 117 17.5T704-291l56-33v-311L480-806 200-635v311l56 33Zm224-189Z" />
        </svg>
      </div>
    </div>
  );
};

export default UserStats;
