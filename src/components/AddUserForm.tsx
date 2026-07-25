import type { UserRole } from "../types/user";
import type { FormPropType } from "../types/userForm";
import { useState } from "react";
import type { User } from "../types/user";

const AddUserForm = ({
  addUserHandeler,
  setIsFormVisible,
  UsersList,
}: {
  addUserHandeler: (newUser: User) => void;
  setIsFormVisible: (value: boolean) => void;
  UsersList: User[];
}) => {
  const [formData, setFormData] = useState<FormPropType>({
    fullName: "",
    age: "",
    role: "",
    isActive: true,
    email: "",
  });
  const newUser: User = {
    ID: (UsersList.at(-1)?.ID ?? 0) + 1,
    fullName: formData.fullName,
    age: parseInt(formData.age),
    role: formData.role,
    isActive: formData.isActive,
    email: formData.email,
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <form action="" className="flex flex-col w-full gap-3">
          <label htmlFor="">
            full name:
            <input
              type="text"
              placeholder="Enter you full name"
              value={formData.fullName}
              required
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-2 bg-gray-100 border border-purple-500 rounded-3xl"
            />
          </label>
          <label htmlFor="">
            age
            <input
              type="text"
              placeholder="age"
              value={formData.age}
              required
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="w-full bg-gray-100 px-2 border border-purple-500 rounded-3xl"
            />
          </label>
          <label htmlFor="">
            role :
            <select
              name="role"
              id="role"
              value={formData.role}
              required
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as UserRole })
              }
              className="w-full bg-gray-100 px-2 border border-purple-500 rounded-3xl"
            >
              <option value="admin">admin</option>
              <option value="operator">operator</option>
              <option value="customer">customer</option>
            </select>
          </label>
          <label htmlFor="">Activity :</label>
          <label htmlFor="">
            Active
            <input
              type="radio"
              value={"Active"}
              checked={formData.isActive}
              onChange={() => setFormData({ ...formData, isActive: true })}
              className="m-2"
            />
          </label>
          <label htmlFor="">
            Inactive
            <input
              type="radio"
              value={"inActive"}
              checked={!formData.isActive}
              onChange={() => setFormData({ ...formData, isActive: false })}
              className="m-2"
            />
            <br />
          </label>
          <label htmlFor="">
            email (optional)
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-gray-100 px-2 border border-purple-500 rounded-sm"
            />
          </label>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              addUserHandeler(newUser);
            }}
            className="bg-gray-100 border border-green-400 p-2 rounded-sm"
          >
            submit
          </button>
          <button
            onClick={() => setIsFormVisible(false)}
            className="bg-gray-100 border border-red-400 p-2 rounded-sm"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
