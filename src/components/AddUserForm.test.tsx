import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AddUserForm from "./AddUserForm";
import * as userApi from "../services/userApi";
import type { User } from "../types/user";

// 1. Mocking i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

// 2. Mocking API calls
vi.mock("../services/userApi", () => ({
  addApiUser: vi.fn(),
}));

// 3. Mocking react-router-dom for navigation tracking
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AddUserForm Validation", () => {
  const mockSetIsLoading = vi.fn();
  const mockSetError = vi.fn();
  const mockOnRemove = vi.fn();

  const defaultProps = {
    UsersList: [],
    setIsLoading: mockSetIsLoading,
    setError: mockSetError,
    isLoading: false,
    error: null,
    onRemove: mockOnRemove,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should stop submission on empty form, show errors, and not call API", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AddUserForm {...defaultProps} />
      </MemoryRouter>,
    );

    const submitButton = screen.getByRole("button", { name: "common.create" });
    await user.click(submitButton);

    expect(screen.getByText("form.errors.nameRequired")).toBeInTheDocument();
    expect(screen.getByText("form.errors.ageRequired")).toBeInTheDocument();
    expect(screen.getByText("form.errors.roleRequired")).toBeInTheDocument();

    expect(userApi.addApiUser).not.toHaveBeenCalled();
  });

  it("should prevent submission if age is invalid (under 18)", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AddUserForm {...defaultProps} />
      </MemoryRouter>,
    );

    const nameInput = screen.getByPlaceholderText("form.placeholders.fullName");
    const ageInput = screen.getByPlaceholderText("form.placeholders.age");
    const submitButton = screen.getByRole("button", { name: "common.create" });

    await user.type(nameInput, "Ali Reza");
    await user.type(ageInput, "12");

    await user.click(submitButton);

    expect(screen.getByText("form.errors.ageRange")).toBeInTheDocument();
    expect(userApi.addApiUser).not.toHaveBeenCalled();
  });

  it("should submit valid data, call API correctly, and navigate to users page", async () => {
    const user = userEvent.setup();
    const mockAddUserHandeler = vi.fn();

    const mockReturnedUser: User = {
      ID: 99,
      fullName: "Amir Reza",
      age: 25,
      role: "admin",
      isActive: true,
      email: "amir@example.com",
    };

    vi.mocked(userApi.addApiUser).mockResolvedValue(mockReturnedUser);

    render(
      <MemoryRouter>
        <AddUserForm {...defaultProps} addUserHandeler={mockAddUserHandeler} />
      </MemoryRouter>,
    );

    const nameInput = screen.getByPlaceholderText("form.placeholders.fullName");
    const ageInput = screen.getByPlaceholderText("form.placeholders.age");
    const emailInput = screen.getByPlaceholderText("form.placeholders.email");
    const roleSelect = screen.getByRole("combobox");

    await user.type(nameInput, "Amir Reza");
    await user.type(ageInput, "25");
    await user.type(emailInput, "amir@example.com");
    await user.selectOptions(roleSelect, "admin");

    const submitButton = screen.getByRole("button", { name: "common.create" });
    await user.click(submitButton);

    expect(userApi.addApiUser).toHaveBeenCalledTimes(1);
    expect(userApi.addApiUser).toHaveBeenCalledWith({
      fullName: "Amir Reza",
      age: "25",
      role: "admin",
      isActive: true,
      email: "amir@example.com",
    });

    expect(mockAddUserHandeler).toHaveBeenCalledTimes(1);
    expect(mockAddUserHandeler).toHaveBeenCalledWith(mockReturnedUser);

    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });
});
