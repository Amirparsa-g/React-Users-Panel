// import React from "react";

const UserStats = ({
  allUsers,
  Admins,
  Moderators,
  Customers,
}: {
  allUsers: number;
  Admins: number;
  Moderators: number;
  Customers: number;
}) => {
  return (
    <div className="m-10 grid grid-col-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="userStats-card">
        <h2 className="text-body">All Users</h2>
        <h3 className="text-header1 font-header1">{allUsers}</h3>
      </div>
      <div className="userStats-card">
        <h2 className="text-body">Admins</h2>
        <h3 className="text-header1 font-header1">{Admins}</h3>
      </div>
      <div className="userStats-card">
        <h2 className="text-body">Moderators</h2>
        <h3 className="text-header1 font-header1">{Moderators}</h3>
      </div>
      <div className="userStats-card">
        <h2 className="text-body">Customers</h2>
        <h3 className="text-header1 font-header1">{Customers}</h3>
      </div>
    </div>
  );
};

export default UserStats;
