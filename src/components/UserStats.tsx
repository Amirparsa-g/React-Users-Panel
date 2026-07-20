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
    <div className="m-10">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right shadow-lg">
        <thead className="bg-slate-100 text-xs uppercase text-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 font-semibold border-2 border-purple-400"
            >
              All Users Count
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-semibold border-2 border-purple-400"
            >
              Active Users count
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-semibold border-2 border-purple-400"
            >
              InActive Users Count
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center p-3 border-2 border-purple-400">
              {allUsers}
            </td>
            <td className="text-center p-3 border-2 border-purple-400">
              {ActiveUsers}
            </td>
            <td className="text-center p-3 border-2 border-purple-400">
              {InActiveUsers}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserStats;
