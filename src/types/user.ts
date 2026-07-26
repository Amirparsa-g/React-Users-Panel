export type UserRole = "admin" | "operator" | "customer"; // todo, move empty string to User Type

export interface User {
  ID: number;
  fullName: string;
  age: number;
  role: UserRole | "";
  isActive: boolean;
  email?: string;
}
