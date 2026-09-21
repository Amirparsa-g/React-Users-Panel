import "@testing-library/jest-dom/vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useState } from "react";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";

import UsersPage from "../pages/UsersPage"; // مسیر را در صورت نیاز اصلاح کن
import * as userApi from "../services/userApi";

// 1. Initialize a REAL i18next instance (No Mocking!)
// This allows us to actually switch languages and trigger React re-renders during the test
i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        "pages.users.title": "Users",
        "pages.search.placeholder": "Search users",
        "pages.search.serverSearch": "Server Search",
        "pages.search.label": "Search", // <--- این خط اضافه شد
      },
    },
    fa: {
      translation: {
        "pages.users.title": "کاربران",
        "pages.search.placeholder": "جستجوی کاربران",
        "pages.search.serverSearch": "جستجوی سرور",
        "pages.search.label": "جستجو", // <--- این خط اضافه شد
      },
    },
  },
});

// Mock the API so we can spy on network requests
vi.mock("../services/userApi", () => ({
  serverSearch: vi.fn(),
}));

// 2. A Wrapper to hold the local state (simulating the parent component)
const RegressionWrapper = () => {
  const [searchedTerm, setSearchTerm] = useState("");

  return (
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <UsersPage
          UsersList={[]}
          status="all"
          setUserStatus={vi.fn()}
          role="all"
          setRole={vi.fn()}
          searchedTerm={searchedTerm}
          setSearchTerm={setSearchTerm}
          SearchUser={setSearchTerm}
          removeUserHandler={vi.fn()}
          ChangeStatusHandler={vi.fn()}
          isLoading={false}
          setIsLoading={vi.fn()}
          error={null}
          setError={vi.fn()}
          LoadUser={vi.fn()}
        />
      </MemoryRouter>
    </I18nextProvider>
  );
};

describe("Language Change Regression Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    i18n.changeLanguage("en"); // Reset to English before each test
  });

  it("should update UI translation, keep local state, and NOT refetch API when language changes", async () => {
    const user = userEvent.setup();
    // جلوگیری از کرش کردن مپِ دیتای سرور
    vi.mocked(userApi.serverSearch).mockResolvedValue([]);

    render(<RegressionWrapper />);

    // A. Verify initial English state
    expect(screen.getByText("Users")).toBeInTheDocument();

    // B. Make a local change: Enable server search and type a name
    const serverSearchCheckbox = screen.getByLabelText("Server Search");
    await user.click(serverSearchCheckbox);

    const searchInput = screen.getByPlaceholderText("Search users");
    await user.type(searchInput, "Ali");

    // NEW: پیدا کردن دکمه جستجو و کلیک روی آن (چون در حالت سرور تایپ کردن به تنهایی کافی نیست)
    const searchButton = screen.getByRole("button", { name: "Search" });
    await user.click(searchButton);

    // Verify the API was called due to our typing and clicking
    expect(userApi.serverSearch).toHaveBeenCalled();
    expect(searchInput).toHaveValue("Ali");

    // C. Clear the API spy history!
    vi.mocked(userApi.serverSearch).mockClear();

    // D. The critical action: Change the language on the fly
    await act(async () => {
      await i18n.changeLanguage("fa");
    });

    // E. The Golden Assertions (Regression Checks)

    // 1. Did the UI text translate correctly?
    expect(screen.getByText("کاربران")).toBeInTheDocument();
    expect(screen.queryByText("Users")).not.toBeInTheDocument();

    // 2. Did the local state (our typed text) survive the re-render?
    const persianSearchInput = screen.getByPlaceholderText("جستجوی کاربران");
    expect(persianSearchInput).toHaveValue("Ali");

    // 3. Did the component accidentally refetch data? (It MUST NOT!)
    expect(userApi.serverSearch).not.toHaveBeenCalled();
  });
});
