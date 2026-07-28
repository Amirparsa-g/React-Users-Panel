import type { User } from "../types/user";
const UserCard = ({
  user,
  onRemove,
  changeStatus,
  setSelectedUser,
  setIsFormVisible,
}: {
  user: User;
  onRemove: (id: number) => void;
  changeStatus: (id: number) => void;
  setSelectedUser: (user: User) => void;
  setIsFormVisible: (status: boolean) => void;
}) => {
  return (
    <div className="bg-slate-50 text-center p-2 rounded-2xl mx-4 border border-purple-500 shadow-lg hover:scale-101 ease-in-out duration-200">
      <p className="p-0.5">{user.fullName}</p>
      <p className="p-0.5">{user.age}</p>
      <p className="p-0.5">{user.role}</p>
      {user.email ? <p>{user.email}</p> : <p>ایمیل ثبت نشده است</p>}
      {user.isActive ? <p>Active</p> : <p>InActive</p>}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onRemove(user.ID)}
          className="text-white bg-red-500 p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300  border-2 border-red-700"
        >
          Remove
        </button>
        <button
          onClick={() => changeStatus(user.ID)}
          className="bg-purple-400 text-white p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300 border-2 border-purple-700"
        >
          changeStatus
        </button>
        <button
          onClick={() => {
            setSelectedUser(user);
            setIsFormVisible(true);
          }}
          className="bg-orange-400 text-white p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300 border-2 border-orange-700"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default UserCard;
