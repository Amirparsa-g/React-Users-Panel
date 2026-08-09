import { mapApiUserToUser, mapUserToApiUser } from "../mappers/userMappers";
import type { ApiUser, UserApiResponse } from "../types/apiUser";
import type { User } from "../types/user";
import type { FormPropType } from "../types/userForm";

const API_BASE_URL = "https://dummyjson.com";

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users?limit=10`);
  if (!response.ok)
    throw new Error(`failed to load users : ${response.status}`);
  const rawData: UserApiResponse = await response.json();
  const cleanData = rawData.users.map(mapApiUserToUser);
  return cleanData;
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) throw new Error(`failed to load user : ${response.status}`);
  const rawData: ApiUser = await response.json();
  const cleanData = mapApiUserToUser(rawData);
  return cleanData;
};
export const addApiUser = async (formData: FormPropType) => {
  const ApiUserPayload: User = {
    ID: Date.now(),
    fullName: formData.fullName,
    age: Number(formData.age),
    role: formData.role,
    email: formData.email,
    isActive: formData.isActive,
  };
  const response = await fetch(`${API_BASE_URL}/users/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mapUserToApiUser(ApiUserPayload)),
  });
  if (!response.ok) throw new Error(`Couldnt add User : ${response.status}`);
};
