import type { User } from "../types/user";
import UserCard from "./userCard";

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="bg-amber-900">
      {users.map((user) => (
        <UserCard key={user.ID} user={user}></UserCard>
      ))}
    </div>
  );
}
