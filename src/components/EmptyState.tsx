import { Link } from "react-router-dom";
import type { User } from "../types/user";
const EmptyState = ({
  UsersList,
  displayedUsers,
  status,
  searchedTerm,
}: {
  UsersList: User[];
  displayedUsers: User[];
  status: string;
  searchedTerm: string;
}) => {
  let content;
  if (UsersList.length === 0)
    content = (
      <div className="flex justify-center h-110 items-center text-5xl">
        <p className="text-center">There are no Users in the dashboard</p>
      </div>
    );
  else if (displayedUsers.length === 0 && searchedTerm.trim() !== "") {
    content = (
      <div className="flex justify-center h-110 items-center text-5xl">
        <p className="text-center">There's no such name in the users list</p>
      </div>
    );
  } else if (displayedUsers.length === 0 && status === "active") {
    content = (
      <div className="flex justify-center h-110 items-center text-5xl">
        <p className="text-center">There are no Active users</p>
      </div>
    );
  } else if (displayedUsers.length === 0 && status === "inactive") {
    content = (
      <div className="flex justify-center h-110 items-center text-5xl">
        <p className="text-center"> There are no Inactive users</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      {content}
      <Link to="/users/new" className="flex">
        <span className="text-black">Add User</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f"
        >
          <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
        </svg>
      </Link>
    </div>
  );
};

export default EmptyState;
