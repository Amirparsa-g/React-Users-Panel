import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import UsersPage from "../pages/UsersPage";

// Mocking i18next

describe("UsersPage - Loading, Error and Retry States", () => {
  // آماده‌سازی Props های پایه برای جلوگیری از ارور تایپ‌اسکریپت
  const defaultProps = {
    UsersList: [],
    status: "all" as const,
    setUserStatus: vi.fn(),
    role: "all" as const,
    setRole: vi.fn(),
    searchedTerm: "",
    setSearchTerm: vi.fn(),
    SearchUser: vi.fn(),
    removeUserHandler: vi.fn(),
    ChangeStatusHandler: vi.fn(),
    isLoading: false,
    setIsLoading: vi.fn(),
    error: null,
    setError: vi.fn(),
    LoadUser: vi.fn(),
  };

  it("should display the Loading component when isLoading is true", () => {
    // رندر کامپوننت در حالت در حال بارگذاری
    render(
      <MemoryRouter>
        <UsersPage {...defaultProps} isLoading={true} />
      </MemoryRouter>,
    );

    // بررسی اینکه کلید ترجمه مربوط به متن لودینگ روی صفحه آمده باشد
    expect(screen.getByText("common.loading")).toBeInTheDocument();

    // به جای تایتل صفحه، چک می‌کنیم که هدر جدول کاربران (که نباید در حالت لودینگ باشد) وجود نداشته باشد
    expect(screen.queryByText("pages.userList.tableHeaders.user")).not.toBeInTheDocument();
  });
  it("should display the Error component and trigger Retry when clicked", async () => {
    const user = userEvent.setup();
    const mockLoadUser = vi.fn(); // جاسوس برای بررسی کلیک شدن دکمه تلاش مجدد

    // رندر کامپوننت در حالت خطا
    render(
      <MemoryRouter>
        <UsersPage
          {...defaultProps}
          isLoading={false}
          error="Network Error"
          LoadUser={mockLoadUser}
        />
      </MemoryRouter>,
    );

    // ۱. بررسی اینکه پیام خطا و دکمه Retry به درستی نمایش داده شده‌اند
    expect(screen.getByText("common.error")).toBeInTheDocument();
    expect(screen.getByText("pages.errors.userError")).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: "common.retry" });
    expect(retryButton).toBeInTheDocument();

    // ۲. شبیه‌سازی کلیک کاربر روی دکمه تلاش مجدد
    await user.click(retryButton);

    // ۳. بررسی طلایی: آیا تابع LoadUser برای دریافت مجدد اطلاعات صدا زده شد؟
    expect(mockLoadUser).toHaveBeenCalledTimes(1);
  });
});
