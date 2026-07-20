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
        <p className="text-center">کاربری در لیست وجود ندارد</p>
      </div>
    );
  else if (displayedUsers.length === 0 && searchedTerm.trim() !== "") {
    content = (
      <div className="flex justify-center h-110 items-center text-5xl">
        <p className="text-center">کاربری با این اسم پیدا نشده</p>
      </div>
    );
  } else if (displayedUsers.length === 0 && status === "active") {
    content = (
      <div className="flex justify-center h-110 items-center text-5xl">
        <p className="text-center"> هیچ کاربر فعالی یافت نشد</p>
      </div>
    );
  } else if (displayedUsers.length === 0 && status === "inactive") {
    content = (
      <div className="flex justify-center h-110 items-center text-5xl">
        <p className="text-center"> هیچ کاربر غیر فعالی پیدا نشد</p>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default EmptyState;
