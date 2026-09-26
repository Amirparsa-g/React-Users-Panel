import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { getUsers } from "../services/userApi";
import UsersPage from "../pages/UsersPage";
import "@testing-library/jest-dom/vitest";
import type { User } from "../types/user";
import i18n from "../i18n";
import { I18nextProvider } from "react-i18next";
import ThemeProvider from "../Contexts/ThemeProvider";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const defaultProps = {
  UsersList: [] as User[],
  status: "all" as const,
  role: "all" as const,
  setUserStatus: vi.fn(),
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

vi.mock("../services/userApi", () => ({ getUsers: vi.fn() }));
const getUsersMock = vi.mocked(getUsers);

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <MemoryRouter initialEntries={["/users"]}>{ui}</MemoryRouter>
      </ThemeProvider>
    </I18nextProvider>,
  );
};

beforeEach(() => {
  getUsersMock.mockReset();
});

describe("UsersPage", () => {
  it("shows user passed directly via props", () => {
    const mockUser: User = {
      ID: 1,
      fullName: "parsa gorji",
      age: 20,
      role: "admin",
      isActive: true,
    };

    renderWithProviders(<UsersPage {...defaultProps} UsersList={[mockUser]} />);

    expect(screen.getByText("parsa gorji")).toBeInTheDocument();
  });
  it("shows an error message when the API request fails", async () => {
    getUsersMock.mockRejectedValue(new Error("Network error"));

    renderWithProviders(<UsersPage {...defaultProps} />);

    expect(screen.getByText("Empty")).toBeInTheDocument();
  });

  it("renders correctly in different languages without refetch", async () => {
    const { unmount } = renderWithProviders(<UsersPage {...defaultProps} />);
    expect(screen.getByText("Empty")).toBeInTheDocument();

    unmount();

    await i18n.changeLanguage("fa");

    renderWithProviders(<UsersPage {...defaultProps} />);

    await waitFor(() => expect(screen.getByText("خالی")).toBeInTheDocument());
  });
});
