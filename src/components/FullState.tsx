import UserList from "./UserList";
import type { User } from "../types/user";

const FullState = ({
  displayedUsers,
  removeUserHandler,
  ChangeStatusHandler,
}: {
  displayedUsers: User[];
  removeUserHandler: (id: number) => void;
  ChangeStatusHandler: (id: number) => void;
}) => {
  const content = (
    <UserList
      users={displayedUsers}
      onRemove={removeUserHandler}
      changeStatus={ChangeStatusHandler}
    />
  );

  return <div>{content}</div>;
};

export default FullState;
