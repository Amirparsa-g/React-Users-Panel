import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useState } from "react";

import UsersPage from "./UsersPage";
import type { User } from "../types/user";

// 1. Mocking i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

// 2. Mocking serverSearch API
vi.mock("../services/userApi", () => ({
  serverSearch: vi.fn(),
}));
vi.mock("../hooks/useMediaQuery", () => ({
  useMediaQuery: vi.fn().mockReturnValue(false), // false means it's not mobile (desktop view)
}));
// 3. ایجاد یک کامپوننت پدرِ شبیه‌سازی‌شده برای مدیریت استیتِ فیلترها در محیط تست
const UsersPageWrapper = ({ initialUsers }: { initialUsers: User[] }) => {
  const [status, setUserStatus] = useState<"active" | "inactive" | "all">(
    "all",
  );
  const [role, setRole] = useState<"admin" | "operator" | "customer" | "all">(
    "all",
  );
  const [searchedTerm, setSearchTerm] = useState("");

  return (
    <MemoryRouter>
      <UsersPage
        UsersList={initialUsers}
        status={status}
        setUserStatus={setUserStatus}
        role={role}
        setRole={setRole}
        searchedTerm={searchedTerm}
        setSearchTerm={setSearchTerm}
        SearchUser={setSearchTerm} // متصل کردن سرچِ کامپوننت به استیتِ اینWrapper
        removeUserHandler={vi.fn()}
        ChangeStatusHandler={vi.fn()}
        isLoading={false}
        setIsLoading={vi.fn()}
        error={null}
        setError={vi.fn()}
        LoadUser={vi.fn()}
      />
    </MemoryRouter>
  );
};

describe("UsersPage Search and Filter", () => {
  // ساخت دیتای تستی: ۳ کاربر با نقش‌ها و وضعیت‌های کاملاً متفاوت
  const mockUsers: User[] = [
    {
      ID: 1,
      fullName: "Alice Admin",
      role: "admin",
      isActive: true,
      age: 30,
      email: "alice@test.com",
    },
    {
      ID: 2,
      fullName: "Bob Operator",
      role: "operator",
      isActive: false,
      age: 25,
      email: "bob@test.com",
    },
    {
      ID: 3,
      fullName: "Charlie Customer",
      role: "customer",
      isActive: true,
      age: 40,
      email: "charlie@test.com",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should filter users correctly by typing in the search input", async () => {
    const user = userEvent.setup();
    render(<UsersPageWrapper initialUsers={mockUsers} />);

    // 1. اول چک می‌کنیم که هر ۳ کاربر در صفحه وجود داشته باشند
    expect(screen.getByText("Alice Admin")).toBeInTheDocument();
    expect(screen.getByText("Bob Operator")).toBeInTheDocument();
    expect(screen.getByText("Charlie Customer")).toBeInTheDocument();

    // 2. فیلد سرچ را از طریق Placeholder پیدا می‌کنیم
    const searchInput = screen.getByPlaceholderText("pages.search.placeholder");

    // 3. کلمه "Bob" را تایپ می‌کنیم
    await user.type(searchInput, "Bob");

    // 4. بررسی نتیجه: فقط Bob باید باشد و بقیه باید مخفی شده باشند
    expect(screen.getByText("Bob Operator")).toBeInTheDocument();
    expect(screen.queryByText("Alice Admin")).not.toBeInTheDocument();
    expect(screen.queryByText("Charlie Customer")).not.toBeInTheDocument();
  });

  it("should filter users correctly by selecting a Role from dropdown", async () => {
    const user = userEvent.setup();
    render(<UsersPageWrapper initialUsers={mockUsers} />);

    // 1. لیست کشویی نقش‌ها را از روی لیبلِ بالای آن پیدا می‌کنیم
    const roleSelect = screen.getByLabelText("pages.filters.role");

    // 2. گزینه "Admin" را از لیست انتخاب می‌کنیم
    // (دقت کن: کلمه "Admin" به خاطر value گزینه‌ها در کدهای خودت است)
    await user.selectOptions(roleSelect, "Admin");

    // 3. بررسی نتیجه: فقط آلیس که ادمین است باید بماند
    expect(screen.getByText("Alice Admin")).toBeInTheDocument();
    expect(screen.queryByText("Bob Operator")).not.toBeInTheDocument();
    expect(screen.queryByText("Charlie Customer")).not.toBeInTheDocument();
  });
});
