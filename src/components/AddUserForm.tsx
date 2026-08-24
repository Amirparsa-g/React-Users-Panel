import type { UserRole } from "../types/user";
import type { FormError, FormPropType } from "../types/userForm";
import { useState } from "react";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { addApiUser } from "../services/userApi";

const AddUserForm = ({
  addUserHandeler,
  UsersList,
  user,
  editUserHandeler,
  setIsLoading,
  setError,
  isLoading,
  error,
}: {
  addUserHandeler?: (newUser: User) => void;
  UsersList: User[];
  user?: User | null;
  editUserHandeler?: (
    formData: FormPropType,
    id: number,
  ) => Promise<boolean | undefined>;
  setIsLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
  isLoading: boolean;
  error: string | null;
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormPropType>({
    fullName: user?.fullName ?? "",
    age: user?.age.toString() ?? "",
    role: user?.role ?? "",
    isActive: user?.isActive ?? true,
    email: user?.email ?? "",
  });
  const [FormError, setFormError] = useState<FormError>({
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
    setFormError(newError);
    return isValid;
  };
  const addingApiUser = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const newUser = await addApiUser(formData);
      return newUser;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Unexpected Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" z-50 flex items-center justify-center">
      <form
        action=""
        className="flex flex-col w-full gap-3"
        onSubmit={async (e) => {
          e.preventDefault();

          const isValid = Validation();

          if (!isValid) return;
          if (formData.role === "") return;

          if (user) {
            if (!editUserHandeler) return;

            const isSuccess = await editUserHandeler(formData, user.ID);
            if (isSuccess) navigate(`/users/${user.ID}`);

            return;
          }

          if (!addUserHandeler) return;
          const newUser = await addingApiUser();
          if (!newUser) return;
          addUserHandeler(newUser);
          navigate("/users");
        }}
      >
        {isLoading && (
          <p className="text-center text-3xl m-2 font-semibold">Loading ...</p>
        )}
        {error && (
          <p className="text-center text-xl m-2 font-semibold text-red-600">
            {error}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <label htmlFor="">
            Full Name:
            <input
              type="text"
              placeholder="Enter you full name"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                });

                setFormError({
                  ...FormError,
                  nameError: "",
                });
              }}
              className="w-full userStats-card p-2"
            />
            {FormError.nameError !== "" && (
              <p className="text-red-700">{FormError.nameError}</p>
            )}
          </label>
          <label htmlFor="">
            Age
            <input
              type="number"
              placeholder="age"
              value={formData.age}
              onChange={(e) => {
                setFormData({ ...formData, age: e.target.value });
                setFormError({ ...FormError, ageError: "" });
              }}
              className="w-full userStats-card p-2"
            />
            {FormError.ageError !== "" && (
              <p className="text-red-700">{FormError.ageError}</p>
            )}
          </label>
          <label htmlFor="">
            Role :
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  role: e.target.value as UserRole | "",
                });

                setFormError({
                  ...FormError,
                  roleError: "",
                });
              }}
              className="w-full userStats-card p-2 h-12"
            >
              <option value=""></option>
              <option value="admin">admin</option>
              <option value="operator">operator</option>
              <option value="customer">customer</option>
            </select>
            {FormError.roleError !== "" && (
              <p className="text-red-700">{FormError.roleError}</p>
            )}
          </label>
          <div>
            <label htmlFor="">Activity :</label>
            <br />
            <div className="userStats-card p-2">
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
            </div>
          </div>
          <div className="flex flex-col col-span-full">
            <label htmlFor="">
              Email (Optional)
              <input
                type="text"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setFormError({ ...FormError, emailError: "" });
                }}
                className="w-full userStats-card p-2"
              />
              {FormError.emailError !== "" && (
                <p className="text-red-700">{FormError.emailError}</p>
              )}
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <button
            disabled={isLoading}
            type="submit"
            className={`${isLoading ? "button-not-selected" : "success-button"}`}
          >
            {isLoading ? "saving ..." : "submit"}
          </button>
          <button
            type="button"
            onClick={() => {
              navigate(user ? `/users/${user.ID}` : "/users");
            }}
            className="danger-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
