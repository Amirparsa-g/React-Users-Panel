import type { UserRole } from "../types/user";
import type { formError, FormPropType } from "../types/userForm";
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

  // todo change to one Error state with optional values in FormErrors type
  const [Error, setError] = useState<formError>({
    nameError: "",
    ageError: "",
    roleError: "",
    emailError: " ",
  });
  // const [ageError, setAgeError] = useState("");
  // const [roleError, setRoleError] = useState("");
  // const [emailError, setEmailError] = useState("");

  const Validation = () => {
    let isValid = true;
    let newError: formError = {
      nameError: "",
      ageError: "",
      roleError: "",
      emailError: " ",
    };
    /*Todo show all errors together on Submit */
    const nameTrimmed = formData.fullName.trim();
    if (nameTrimmed === "") {
      console.log(Error);
      newError = { ...newError, nameError: "Please Enter your Name" };
      console.log(newError);
      console.log("test");
      isValid = false;
    } else if (nameTrimmed.length < 3) {
      newError = {
        ...newError,
        nameError: "name should have at least 3 charachters",
      };
      isValid = false;
    }
    if (formData.age.trim() === "") {
      newError = { ...newError, ageError: "Enter your age" };
      console.log(newError);
      isValid = false;
    } else if (formData.age.trim() !== "") {
      const parsedAge = parseInt(formData.age); //todo fix, it will make 18.5 to 18, only integer allowed
      if (parsedAge.toString() !== formData.age) {
        newError = { ...newError, ageError: "your age must be an integer" };
        isValid = false;
      }
      if (parsedAge < 18) {
        newError = { ...newError, ageError: "You must be 18 years ir older" };
        isValid = false;
      } else if (parsedAge > 80) {
        newError = { ...newError, ageError: "You must be younger than 80" };
        isValid = false;
      }
    }

    if (formData.role === "") {
      newError = { ...newError, roleError: "Choose the user's role" };
      isValid = false;
    }
    if (formData.email?.trim() !== "") {
      const userEmail = formData.email;
      if (!userEmail?.includes("@")) {
        newError = { ...newError, emailError: "Email should contain an @" };
        isValid = false;
      } else if (userEmail.includes("@")) {
        const atIndex = userEmail.indexOf("@");
        const slicedEmail = userEmail.slice(atIndex);
        if (!slicedEmail.includes(".")) {
          newError = {
            ...newError,
            emailError: "Email sjould contain a . after @",
          };
          isValid = false;
        }
      }
      const UserEmails = UsersList.map((user) =>
        user.email?.toLowerCase().trim(),
      );
      if (UserEmails.includes(userEmail?.toLowerCase().trim())) {
        newError = { ...newError, emailError: "This email already exists" };
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
            console.log(Error);
            if (!isValid) return;
            const newUser: User = {
              ID: (UsersList.at(-1)?.ID ?? 0) + 1,
              fullName: formData.fullName,
              age: parseInt(formData.age),
              role: formData.role,
              isActive: formData.isActive,
              email: formData.email,
            };
            addUserHandeler(newUser);
          }}
        >
          <label htmlFor="">
            full name:
            <input
              type="text"
              placeholder="Enter you full name"
              value={formData.fullName}
              // required
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                setError({ ...Error, nameError: "" });
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
              type="number" /*todo change to number*/
              placeholder="age"
              value={formData.age}
              onChange={(e) => {
                console.log("fullName");
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
                setFormData({ ...formData, role: e.target.value as UserRole });
                setError({ ...Error, roleError: "" });
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
            type="reset"
            onClick={() => setIsFormVisible(false)}
            className="bg-gray-100 border border-red-400 p-2 rounded-sm"
            /* todo add type */
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
