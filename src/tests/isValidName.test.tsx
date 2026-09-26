import { describe, expect, it } from "vitest";
import { isValidName } from "../utils/utils";

describe("isValidBame", () => {
  it("the funcyion should reject blank names", () => {
    expect(isValidName(" ")).toBe(false);
  });

  it("Accepts names with 3 characters", () => {
    expect(isValidName("lia")).toBe(true);
  });

  it("Accepts names with more than 3 characters", () => {
    expect(isValidName("parsa    ")).toBe(true);
  });
});
