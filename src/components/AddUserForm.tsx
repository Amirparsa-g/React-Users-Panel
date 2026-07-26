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

  // todo change to one Error state with optional values in FormErrors type
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [emailError, setEmailError] = useState("");

  const Validation = () => {
    /*Todo show all errors together on Submit */
    const nameTrimmed = formData.fullName.trim();
    if (nameTrimmed === "") {
      setNameError("Please Enter your Name");
      return false;
    } else if (nameTrimmed.length < 3) {
      setNameError("name should have at least 3 charachters");
      return false;
    }
    if (formData.age.trim() === "") {
      setAgeError("Enter your age");
      return false;
    }
    const isNumeric = !Number.isNaN(Number(formData.age));
    if (!isNumeric) {
      setAgeError("your age must be a number");
      return false;
    } else if (isNumeric) {
      const parsedAge = parseInt(formData.age); //todo fix, it will make 18.5 to 18, only integer allowed
      if (parsedAge < 18) {
        setAgeError("You must be 18 years ir older");
        return false;
      } else if (parsedAge > 80) {
        setAgeError("You must be younger than 80");
        return false;
      }
    }
    if (formData.role === "") {
      setRoleError("Choose the user's role");
      return false;
    }
    if (formData.email?.trim() !== "") {
      const userEmail = formData.email;
      if (!userEmail?.includes("@")) {
        setEmailError("Email should contain an @");
        return false;
      } else if (userEmail.includes("@")) {
        const atIndex = userEmail.indexOf("@");
        const slicedEmail = userEmail.slice(atIndex);
        if (!slicedEmail.includes(".")) {
          setEmailError("Email sjould contain a . after @");
          return false;
        }
      }
      const UserEmails = UsersList.map((user) =>
        user.email?.toLowerCase().trim(),
      );
      if (UserEmails.includes(userEmail.toLowerCase().trim())) {
        setEmailError("This email already exists");
        return false;
      }
    }
    return true;
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
                setNameError("");
              }}
              className="w-full px-2 bg-gray-100 border border-purple-500 rounded-3xl"
            />
            {nameError !== "" && <p className="text-red-700">{nameError}</p>}
          </label>
          <label htmlFor="">
            age
            <input
              type="text" /*todo change to number*/
              placeholder="age"
              value={formData.age}
              onChange={(e) => {
                setFormData({ ...formData, age: e.target.value });
                setAgeError("");
              }}
              className="w-full bg-gray-100 px-2 border border-purple-500 rounded-3xl"
            />
            {ageError !== "" && <p className="text-red-700">{ageError}</p>}
          </label>
          <label htmlFor="">
            role :
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={(e) => {
                setFormData({ ...formData, role: e.target.value as UserRole });
                setRoleError("");
              }}
              className="w-full bg-gray-100 px-2 border border-purple-500 rounded-3xl"
            >
              <option value=""></option>
              <option value="admin">admin</option>
              <option value="operator">operator</option>
              <option value="customer">customer</option>
            </select>
            {roleError !== "" && <p className="text-red-700">{roleError}</p>}
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
                setEmailError("");
              }}
              className="w-full bg-gray-100 px-2 border border-purple-500 rounded-sm"
            />
            {emailError !== "" && <p className="text-red-700">{emailError}</p>}
          </label>
          <button
            type="submit"
            className="bg-gray-100 border border-green-400 p-2 rounded-sm"
          >
            submit
          </button>
          <button
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
