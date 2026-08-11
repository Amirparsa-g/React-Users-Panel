export type ApiUserRole = "admin" | "moderator" | "user";

export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  role: ApiUserRole;
  isActive?: boolean;
  email?: string;
}

export interface UserApiResponse {
  users: ApiUser[];
  total: number;
  skip: number;
  limit: number;
}
export interface DeletedUserResponse {
  id: number;
  isDeleted: boolean;
  deletedOn: string;
}
