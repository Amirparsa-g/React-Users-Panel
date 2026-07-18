import type { User } from "../types/user";

interface UserCardProps {
  user: User;
}
export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex bg-zinc-600">
      <p>name : {user.fullName}</p>
      <p>name : {user.age}</p>
      <p>name : {user.role}</p>
      <p>status : {user.isActive ? "Active" : "InActive"}</p>
      {user.email ? <p>Email: {user.email}</p> : <p>ایمیل ثبت نشده است</p>}
    </div>
  );
}
