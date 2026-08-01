import type { UserRole } from "../types/user";
export interface FormPropType {
  fullName: string;
  age: string;
  role: UserRole | "";
  isActive: boolean;
  email?: string;
}

export interface FormError {
  nameError?: string;
  ageError?: string;
  roleError?: string;
  emailError?: string;
}
