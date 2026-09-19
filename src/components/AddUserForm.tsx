import type { UserRole } from "../types/user";
import type { FormError, FormPropType } from "../types/userForm";
import { useState } from "react";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { addApiUser } from "../services/userApi";
import Buttons from "./Buttons";

import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";

const AddUserForm = ({
  addUserHandeler,
  UsersList,
  user,
  onRemove,
  editUserHandeler,
  setIsLoading,
  setError,
  isLoading,
  error,
}: {
  addUserHandeler?: (newUser: User) => void;
  UsersList: User[];
  user?: User | null;
  onRemove: (id: number) => Promise<boolean | undefined>;
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
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);

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
      newError.nameError = t("form.errors.nameRequired");
      isValid = false;
    } else if (nameTrimmed.length < 3) {
      newError.nameError = t("form.errors.nameLength");
      isValid = false;
    }
    if (formData.age.trim() === "") {
      newError.ageError = t("form.errors.ageRequired");
      isValid = false;
    } else if (formData.age.trim() !== "") {
      const age = Number(formData.age);

      if (formData.age.trim() === "") {
        newError.ageError = t("form.errors.ageRequired");
        isValid = false;
      } else if (!Number.isFinite(age) || !Number.isInteger(age)) {
        newError.ageError = t("form.errors.ageInteger");
        isValid = false;
      } else if (age < 18 || age > 80) {
        newError.ageError = t("form.errors.ageRange");
        isValid = false;
      }
    }

    if (formData.role === "") {
      newError.roleError = t("form.errors.roleRequired");
      isValid = false;
    }
    if (formData.email?.trim() !== "") {
      const userEmail = formData.email;
      if (!userEmail?.includes("@")) {
        newError.emailError = t("form.errors.emailAt");
        isValid = false;
      } else if (userEmail.includes("@")) {
        const atIndex = userEmail.indexOf("@");
        const slicedEmail = userEmail.slice(atIndex);
        if (!slicedEmail.includes(".")) {
          newError.emailError = t("form.errors.emailDot");
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
        newError.emailError = t("form.errors.emailDuplicate");
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
      else setError(t("pages.errors.unexpected"));
    } finally {
      setIsLoading(false);
    }
  };
  const { t } = useTranslation();
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="w-full">
      <form
        action=""
        className="flex flex-col w-full gap-3 userStats-card "
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
        {error && (
          <p className="text-center text-xl m-2 font-semibold text-danger">
            {error}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <label htmlFor="userFullName" className="label-form">
            {t("form.fullName")}
            <input
              id="userFullName"
              type="text"
              placeholder={t("form.placeholders.fullName")}
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
              className="w-full border control"
            />
            {FormError.nameError !== "" && (
              <p className="text-danger">{FormError.nameError}</p>
            )}
          </label>
          <label htmlFor="userAge" className="label-form">
            {t("form.age")}
            <input
              id="userAge"
              type="number"
              placeholder={t("form.placeholders.age")}
              value={formData.age}
              onChange={(e) => {
                setFormData({ ...formData, age: e.target.value });
                setFormError({ ...FormError, ageError: "" });
              }}
              className="control"
            />
            {FormError.ageError !== "" && (
              <p className="text-danger">{FormError.ageError}</p>
            )}
          </label>
          <label htmlFor="userRole" className="label-form">
            {t("form.role")}
            <select
              name="role"
              id="userRole"
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
              className="control"
            >
              <option value=""></option>
              <option value="admin">{t("form.roles.admin")}</option>
              <option value="operator">{t("form.roles.operator")}</option>
              <option value="customer">{t("form.roles.customer")}</option>
            </select>
            {FormError.roleError !== "" && (
              <p className="text-danger">{FormError.roleError}</p>
            )}
          </label>
          <div className="label-form ">
            <label htmlFor="activityDiv">
              {t("form.activity")}
              <br />
              <div className="control h-10.5 " id="activityDiv">
                <label htmlFor="activeRadio">
                  {t("form.active")}
                  <input
                    id="activeRadio"
                    type="radio"
                    value={"Active"}
                    checked={formData.isActive}
                    onChange={() =>
                      setFormData({ ...formData, isActive: true })
                    }
                    className="m-2"
                  />
                </label>
                <label htmlFor="inactiveRadio">
                  {t("form.inactive")}
                  <input
                    id="inactiveRadio"
                    type="radio"
                    value={"inActive"}
                    checked={!formData.isActive}
                    onChange={() =>
                      setFormData({ ...formData, isActive: false })
                    }
                    className="m-2"
                  />
                  <br />
                </label>
              </div>
            </label>
          </div>
          <div className="flex flex-col col-span-full">
            <label htmlFor="userEmail" className="label-form">
              {t("form.optional")}
              <input
                id="userEmail"
                placeholder={t("form.placeholders.email")}
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setFormError({ ...FormError, emailError: "" });
                }}
                className="control"
              />
              {FormError.emailError !== "" && (
                <p className="text-danger">{FormError.emailError}</p>
              )}
            </label>
          </div>
        </div>
        <div className=" grid grid-cols-2 sm:flex sm:justify-end md:items-end w-full gap-2">
          <Buttons
            comp="button"
            buttonType={isLoading ? "loading" : "submit"}
            disabled={isLoading}
            more="w-full sm:w-35"
          >
            {user
              ? isLoading
                ? t("common.saving")
                : t("common.save")
              : isLoading
                ? t("common.saving")
                : t("common.create")}
          </Buttons>
          <Buttons
            comp="link"
            navigation="/users"
            buttonType={"neutral"}
            more="text-center w-full sm:w-35 text-text-secondary"
          >
            {t("common.cancel")}
          </Buttons>
          {user && (
            <Buttons
              comp="button"
              buttonType="danger"
              disabled={updatingUserId === user.ID}
              onClick={async () => {
                setUpdatingUserId(user.ID);
                const isDeleted = await onRemove(user.ID);
                setUpdatingUserId(null);
                if (isDeleted) {
                  navigate("/users");
                }
              }}
              more="col-span-2 w-full sm:w-fit "
            >
              {t("common.delete")}
            </Buttons>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
