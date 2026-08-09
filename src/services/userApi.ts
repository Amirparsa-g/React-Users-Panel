import { mapApiUserToUser, mapUserToApiUser } from "../mappers/userMappers";
import type {
  ApiUser,
  DeletedUserResponse,
  UserApiResponse,
} from "../types/apiUser";
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
export const addApiUser = async (formData: FormPropType): Promise<User> => {
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
  const data = await response.json();
  const newUser: User = mapApiUserToUser(data);
  return newUser;
};

export const editApiUserStatus = async (user: User): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${user.ID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isActive: !user.isActive,
    }),
  });
  if (!response.ok) throw new Error(`User Not Found : ${response.status}`);
  const data = await response.json();
  console.log(data);
  const editedUser = mapApiUserToUser(data);
  editedUser.isActive = !user.isActive;
  console.log(editedUser);
  return editedUser;
};

export const deleteApiUser = async (
  id: number,
): Promise<DeletedUserResponse> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`User Not Found : ${response.status}`);
  const data = await response.json();
  return data;
};
