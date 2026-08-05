import type { UserRole } from "../types/user";
import type { FormError, FormPropType } from "../types/userForm";
import { useState } from "react";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";

const AddUserForm = ({
  addUserHandeler,
  setIsFormVisible,
  UsersList,
  user,
  editUserHandeler,
  setSelectedUser,
}: {
  addUserHandeler?: (newUser: User) => void;
  setIsFormVisible: (value: boolean) => void;
  UsersList: User[];
  user?: User | null;
  editUserHandeler?: (formData: FormPropType, id: number) => void;
  setSelectedUser: (user: User | null) => void;
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormPropType>({
    fullName: user?.fullName ?? "",
    age: user?.age.toString() ?? "",
    role: user?.role ?? "",
    isActive: user?.isActive ?? true,
    email: user?.email ?? "",
  });
  const [Error, setError] = useState<FormError>({
    nameError: "",
    ageError: "",
    roleError: "",
    emailError: "",
  });

  const Validation = () => {
    let isValid = true;
    const newError: FormError = {};

    const nameTrimmed = formData.fullName.trim();
    if (nameTrimmed === "") {
      newError.nameError = "Please Enter your Name";
      isValid = false;
    } else if (nameTrimmed.length < 3) {
      newError.nameError = "name should have at least 3 charachters";
      isValid = false;
    }
    if (formData.age.trim() === "") {
      newError.ageError = "Enter your age";
      isValid = false;
    } else if (formData.age.trim() !== "") {
      const age = Number(formData.age);

      if (formData.age.trim() === "") {
        newError.ageError = "Enter your age";
        isValid = false;
      } else if (!Number.isFinite(age) || !Number.isInteger(age)) {
        newError.ageError = "Your age must be an integer";
        isValid = false;
      } else if (age < 18 || age > 80) {
        newError.ageError = "Age must be between 18 and 80";
        isValid = false;
      }
    }

    if (formData.role === "") {
      newError.roleError = "Choose the user's role";
      isValid = false;
    }
    if (formData.email?.trim() !== "") {
      const userEmail = formData.email;
      if (!userEmail?.includes("@")) {
        newError.emailError = "Email should contain an @";
        isValid = false;
      } else if (userEmail.includes("@")) {
        const atIndex = userEmail.indexOf("@");
        const slicedEmail = userEmail.slice(atIndex);
        if (!slicedEmail.includes(".")) {
          newError.emailError = "Email sjould contain a . after @";
          isValid = false;
        }
      }

      const UserEmails = UsersList.map((User) => {
        if (user) {
          if (user.ID !== User.ID) return User.email?.toLowerCase().trim();
        } else {
          return User.email?.toLowerCase().trim();
        }
      });

      if (UserEmails.includes(userEmail?.toLowerCase().trim())) {
        newError.emailError = "This email already exists";
        isValid = false;
      }
    }
    setError(newError);
    return isValid;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <form
          action=""
          className="flex flex-col w-full gap-3"
          onSubmit={(e) => {
  e.preventDefault();

  const isValid = Validation();

  if (!isValid) return;
  if (formData.role === "") return;

  if (user) {
    if (!editUserHandeler) return;

    editUserHandeler(formData, user.ID);
    setSelectedUser(null);
    navigate(`/users/${user.ID}`);

    return;
  }

  if (!addUserHandeler) return;

  const newUser: User = {
    ID: Date.now(),
    fullName: formData.fullName.trim(),
    age: Number(formData.age),
    role: formData.role,
    isActive: formData.isActive,
    email: formData.email.trim() || undefined,
  };

  addUserHandeler(newUser);
  navigate("/users");
}}
        >
          <h1 className="text-center , text-xl ">
            {user ? "Edit User" : "Add User"}
          </h1>
          <label htmlFor="">
            full name:
            <input
              type="text"
              placeholder="Enter you full name"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                });

                setError({
                  ...Error,
                  nameError: "",
                });
              }}  
              className="w-full px-2 bg-gray-100 border border-purple-500 rounded-3xl"
            />
            {Error.nameError !== "" && (
              <p className="text-red-700">{Error.nameError}</p>
            )}
          </label>
          <label htmlFor="">
            age
            <input
              type="number"
              placeholder="age"
              value={formData.age}
              onChange={(e) => {
                setFormData({ ...formData, age: e.target.value });
                setError({ ...Error, ageError: "" });
              }}
              className="w-full bg-gray-100 px-2 border border-purple-500 rounded-3xl"
            />
            {Error.ageError !== "" && (
              <p className="text-red-700">{Error.ageError}</p>
            )}
          </label>
          <label htmlFor="">
            role :
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  role: e.target.value as UserRole | "",
                });

                setError({
                  ...Error,
                  roleError: "",
                });
            }}
              className="w-full bg-gray-100 px-2 border border-purple-500 rounded-3xl"
            >
              <option value=""></option>
              <option value="admin">admin</option>
              <option value="operator">operator</option>
              <option value="customer">customer</option>
            </select>
            {Error.roleError !== "" && (
              <p className="text-red-700">{Error.roleError}</p>
            )}
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
              type="text"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setError({ ...Error, emailError: "" });
              }}
              className="w-full bg-gray-100 px-2 border border-purple-500 rounded-sm"
            />
            {Error.emailError !== "" && (
              <p className="text-red-700">{Error.emailError}</p>
            )}
          </label>
          <button
            type="submit"
            className="bg-gray-100 border border-green-400 p-2 rounded-sm"
          >
            submit
          </button>
          <button
            type="button"
            onClick={() => {
              setIsFormVisible(false);
              setSelectedUser(null);
              navigate(user ? `/users/${user.ID}` : "/users");
            }}
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
