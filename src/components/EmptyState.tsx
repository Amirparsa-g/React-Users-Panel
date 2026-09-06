import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="flex flex-col userStats-card border border-dotted w-full">
      <p className="text-small font-bold">Empty</p>
      <p className="caption mb-5">
        No users match the current search or filters.
      </p>
      <Link to={"/users/new"} className="primary-button p-2 w-fit">
        Add User
      </Link>
    </div>
  );
};

export default EmptyState;
