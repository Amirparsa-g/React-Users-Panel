export type UserRole = "admin" | "operator" | "customer";

export interface User {
  ID: number;
  fullName: string;
  age: number;
  role: UserRole | "";
  isActive: boolean;
  email?: string;
}
