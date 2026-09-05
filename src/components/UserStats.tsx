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
      <div className="userStats-card">
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
      </div>
      <div className="userStats-card">
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
      </div>
      <div className="userStats-card">
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
      </div>
      <div className="userStats-card">
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
      </div>
    </div>
  );
};

export default UserStats;
