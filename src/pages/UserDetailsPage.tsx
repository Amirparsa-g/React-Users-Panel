import { Link, useNavigate, useParams } from "react-router-dom";
import type { User } from "../types/user";
import AddUserForm from "../components/AddUserForm";
import type { FormPropType } from "../types/userForm";
import { useEffect, useRef } from "react";

const UserDetailsPage = ({
  UsersList,
  onRemove,
  changeStatus,
  setSelectedUser,
  setIsFormVisible,
  changeInfo,
  isFormVisible,
  selectedUser,
}: {
  UsersList: User[];
  isFormVisible: boolean;
  selectedUser: User | null;
  onRemove: (id: number) => void;
  changeStatus: (id: number) => void;
  setSelectedUser: (user: User | null) => void;
  setIsFormVisible: (status: boolean) => void;
  changeInfo: (formData: FormPropType, id: number) => void;
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clickedUser: User | undefined = UsersList.find(
    (user) => user.ID === Number(id),
  );
  const isDeleting = useRef(false);
  useEffect(() => {
    if (!clickedUser && !isDeleting.current) {
      alert("User Not found");
      navigate("/users");
    }
  }, [clickedUser, navigate]);
  useEffect(() => {
    document.title = "User Details | User Management";
  }, []);
  if (!clickedUser) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {isFormVisible && (
        <AddUserForm
          setIsFormVisible={setIsFormVisible}
          UsersList={UsersList}
          editUserHandeler={changeInfo}
          user={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
      <div className="bg-slate-50 text-center p-2 rounded-2xl mx-4 border border-purple-500 shadow-lg hover:scale-101 ease-in-out duration-200 min-w-md">
        <p>{clickedUser.fullName}</p>
        <p>{clickedUser.age}</p>
        <p>{clickedUser.role}</p>
        <p>{clickedUser.email}</p>
        <p>{clickedUser.isActive ? "Active" : "inActive"}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              isDeleting.current = true;
              onRemove(clickedUser.ID);
              navigate("/users");
            }}
            className="text-white bg-red-500 p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300  border-2 border-red-700"
          >
            remove
          </button>
          <button
            onClick={() => changeStatus(clickedUser.ID)}
            className="bg-purple-400 text-white p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300 border-2 border-purple-700"
          >
            change status
          </button>
          <button
            onClick={() => {
              setSelectedUser(clickedUser);
              setIsFormVisible(true);
            }}
            className="bg-orange-400 text-white p-2 rounded-2xl mt-2 hover:scale-105 ease-in-out duration-300 border-2 border-orange-700"
          >
            Edit
          </button>
        </div>
      </div>
      <Link
        to="/users"
        className="mt-2 border border-purple-400 p-2 rounded-md hover:scale-105 tramsition-all ease-in-out duration-300"
      >
        go back to users page
      </Link>
    </div>
  );
};

export default UserDetailsPage;
