import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { getUsers } from "../services/userApi";
import UsersPage from "../pages/UsersPage";
import "@testing-library/jest-dom/vitest";
import type { User } from "../types/user";

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

    render(
      <MemoryRouter>
        <UsersPage {...defaultProps} UsersList={[mockUser]} />
      </MemoryRouter>,
    );

    expect(screen.getByText("parsa gorji")).toBeInTheDocument();
  });
  it("shows an error message when the API request fails", async () => {
    getUsersMock.mockRejectedValue(new Error("Network error"));

    render(
      <MemoryRouter>
        <UsersPage {...defaultProps} />
      </MemoryRouter>,
    );

    expect(screen.getByText("pages.empty.title")).toBeInTheDocument();
  });
});
