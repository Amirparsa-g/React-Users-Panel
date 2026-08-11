import type { ApiUser, ApiUserRole } from "../types/apiUser";
import type { User, UserRole } from "../types/user";

function mapApiRoleToUserRole(role: ApiUserRole): UserRole {
  if (role === "moderator") return "operator";
  if (role === "user") return "customer";
  return "admin";
}

export function mapApiUserToUser(apiUser: ApiUser): User {
  return {
    ID: apiUser.id,
    fullName: `${apiUser.firstName} ${apiUser.lastName}`.trim(),
    role: mapApiRoleToUserRole(apiUser.role),
    age: apiUser.age,
    isActive: apiUser.isActive ?? true,
    email: apiUser.email?.trim() || undefined,
  };
}
export function splitFullName(fullName: string) {
  const [firstName, ...rest] = fullName.trim().split(/\s+/);
  return {
    firstName,
    lastName: rest.join(""),
  };
}

export function mapUserRoleToApiUserRole(userRole: UserRole | ""): ApiUserRole {
  if (userRole === "operator") return "moderator";
  if (userRole === "customer") return "user";
  return "admin";
}

export function mapUserToApiUser(user: User): ApiUser {
  const { firstName, lastName } = splitFullName(user.fullName);
  return {
    id: user.ID,
    firstName: firstName,
    lastName: lastName,
    role: mapUserRoleToApiUserRole(user.role),
    age: user.age,
    isActive: user.isActive,
    email: user.email,
  };
}
