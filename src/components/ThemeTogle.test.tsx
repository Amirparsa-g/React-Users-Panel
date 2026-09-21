import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// TODO: ایمپورت کردن Provider تم و کامپوننت دکمه‌ی تم از مسیرهای خودشان
import ThemeProvider from "../Contexts/ThemeProvider"; // مسیر پرووایدر تم خودت را چک کن
import ThemeToggleButton from "./ThemeToggleButton"; // همین کامپوننتی که کدهایش را فرستادی

// شبیه‌سازی متد scrollTo روی عناصر DOM برای جلوگیری از ارور jsdom
Element.prototype.scrollTo = vi.fn();

// Mocking useMediaQuery
vi.mock("../hooks/useMediaQuery", () => ({
  useMediaQuery: vi.fn().mockReturnValue(false),
}));

// Mocking i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

describe("Theme Toggle and Persistence", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = "";
  });

  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.className = "";
  });

  it("should toggle theme, save to localStorage, and restore on remount", async () => {
    const user = userEvent.setup();

    // رندر کردن مستقلِ ThemeProvider به همراه دکمه‌ی تغییر تم (بدون نیاز به App و Router)
    const { unmount } = render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>,
    );

    // پیدا کردن دکمه‌ی تم تاریک از طریق aria-label="dark"
    const darkThemeButton = screen.getByRole("button", { name: /^dark$/i });

    // کلیک روی دکمه حالت تاریک
    await user.click(darkThemeButton);

    // بررسی اعمال کلاس dark روی html و ذخیره شدن در localStorage
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("theme")).toBe("dark");

    // شبیه‌سازی بستن و بارگذاری مجدد (Remount)
    unmount();

    // رندر مجدد کامپوننت تم برای بررسی بازیابی از localStorage
    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>,
    );

    // بررسی اینکه تم تاریک باقی مانده است
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
