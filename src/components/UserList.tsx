import type { User } from "../types/user";
import UserCard from "./UserCard";

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {users.map((user) => (
        <UserCard key={user.ID} user={user}></UserCard>
      ))}
    </div>
  );
}
