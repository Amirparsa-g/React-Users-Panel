import type { User } from "../types/user";

interface UserCardProps {
  user: User;
}
export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex  bg-zinc-900 text-slate-100 flex-col justify-center items-center p-5 mt-5 mb-5 border rounded-2xl">
      <p className="p-2">name :{user.fullName}</p>
      <p className="p-2">age :{user.age}</p>
      <p className="p-2">role :{user.role}</p>
      <p className="p-2">status :{user.isActive ? "Active" : "InActive"}</p>
      {user.email ? <p>Email: {user.email}</p> : <p>ایمیل ثبت نشده است</p>}
    </div>
  );
}
