import type { User } from "./user";

export type CreateUserRequest = Omit<User, "ID">;

export type UpdateUserREquest = Partial<CreateUserRequest>;
