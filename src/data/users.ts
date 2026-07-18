import type { User } from "../types/user";

export const users: User[] = [
  {
    ID: 1,
    fullName: "Parsa Gorji",
    age: 20,
    role: "admin",
    isActive: true,
    email: "Amirparsa_g@yahoo.com",
  },
  {
    ID: 2,
    fullName: "John Doe",
    age: 34,
    role: "operator",
    isActive: true,
  },
  {
    ID: 3,
    fullName: "matin tavakoli",
    age: 19,
    role: "customer",
    isActive: false,
  },
  {
    ID: 4,
    fullName: "Ali Mohammadi",
    age: 73,
    role: "customer",
    isActive: true,
    email: "AliMohammadi@gmail.com",
  },
  {
    ID: 5,
    fullName: "sara mohammadi",
    age: 29,
    role: "operator",
    isActive: false,
  },
  {
    ID: 6,
    fullName: "Amir mohammadi",
    age: 30,
    role: "admin",
    isActive: false,
    email: "Amirmohammsdi@outlook.com",
  },
];
