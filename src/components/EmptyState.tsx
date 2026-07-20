import type { User } from "../types/user";
import UserList from "./UserList";
const EmptyState = ({
  UsersList,
  displayedUsers,
  removeUserHandler,
  ChangeStatusHandler,
}: {
  UsersList: User[];
  displayedUsers: User[];
  removeUserHandler: (id: number) => void;
  ChangeStatusHandler: (id: number) => void;
}) => {
  let content;
  if (UsersList.length === 0)
    content = (
      <div className="flex justify-center h-110 items-center text-5xl">
        <p className="text-center">کاربری در لیست وجود ندارد</p>
      </div>
    );
  else if (displayedUsers.length === 0) {
    content = (
      <div className="flex justify-center h-110 items-center text-5xl">
        <p className="text-center">کاربری با این اسم پیدا نشده</p>
      </div>
    );
  } else
    content = (
      <UserList
        users={displayedUsers}
        onRemove={removeUserHandler}
        changeStatus={ChangeStatusHandler}
      />
    );

  return <div>{content}</div>;
};

export default EmptyState;
