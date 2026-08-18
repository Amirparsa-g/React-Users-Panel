// import React from "react";

const UserStats = ({
  allUsers,
  ActiveUsers,
  InActiveUsers,
}: {
  allUsers: number;
  ActiveUsers: number;
  InActiveUsers: number;
}) => {
  return (
    <div className="m-10 grid grid-col-1 gap-4 sm:grid-cols-3">
      <div className="border border-green-500 bg-slate-100 p-4 rounded-md shadow-lg ">
        <h2 className="font-semibold text-xl">All Users</h2>
        {allUsers}
      </div>
      <div className="border border-green-500 bg-slate-100 p-4 rounded-md shadow-lg ">
        <h2 className="font-semibold text-xl">Active Users</h2>
        {ActiveUsers}
      </div>
      <div className="border border-green-500 bg-slate-100 p-4 rounded-md shadow-lg ">
        <h2 className="font-semibold text-xl">InActive Users</h2>
        {InActiveUsers}
      </div>
    </div>
  );
};

export default UserStats;
