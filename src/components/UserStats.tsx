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
    <div className="m-10 grid grid-col-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="userStats-card">
        <h2 className="text-body stats-header bg-black/10">All Users</h2>
        <div className="flex justify-start items-start">
          <h3 className="text-header1 font-header1">{allUsers}</h3>
          {isLoading && (
            <svg
              className="animate-spin mt-4 ml-2 text-black"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z" />
            </svg>
          )}
        </div>
      </div>
      <div className="userStats-card">
        <h2 className="text-body text-admin bg-admin/10 stats-header">
          Admins
        </h2>
        <div className="flex justify-start items-start">
          <h3 className="text-header1 font-header1">{Admins}</h3>
          {isLoading && (
            <svg
              className="animate-spin mt-4 ml-2 text-black"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z" />
            </svg>
          )}
        </div>
      </div>
      <div className="userStats-card">
        <h2 className="text-body stats-header text-moderator bg-moderator/10">
          Moderators
        </h2>
        <div className="flex justify-start items-start">
          <h3 className="text-header1 font-header1">{Moderators}</h3>
          {isLoading && (
            <svg
              className="animate-spin mt-4 ml-2 text-black"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z" />
            </svg>
          )}
        </div>
      </div>
      <div className="userStats-card">
        <h2 className="text-body stats-header bg-black/10">Customers</h2>
        <div className="flex justify-start items-start">
          <h3 className="text-header1 font-header1">{Customers}</h3>
          {isLoading && (
            <svg
              className="animate-spin mt-4 ml-2 text-black"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStats;
