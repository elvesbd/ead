import Validator from "@/utils/Validator";

describe("Validator", () => {
  it("ensures returns null if value is given", () => {
    const error = Validator.NotNull("Good morning");

    expect(error).toBeNull();
    expect(error?.errorMessage).toBeUndefined();
  });

  it("ensures error validation if value is null", () => {
    const error = Validator.NotNull(null, "Invalid value!");
    expect(error).not.toBeNull();
    expect(error?.errorMessage).toBe("Invalid value!");
  });

  it("ensures error validation if value is undefined", () => {
    const error = Validator.NotNull(undefined, "Invalid value!");

    expect(error).not.toBeNull();
    expect(error?.errorMessage).toBe("Invalid value!");
  });

  it("ensures error validation if value is empty", () => {
    const error = Validator.NotNull("", "Empty value!");

    expect(error).not.toBeNull();
    expect(error?.errorMessage).toBe("Empty value!");
  });

  it("ensures returns default error message", () => {
    const error = Validator.NotNull(null);

    expect(error).not.toBeNull();
    expect(error?.errorMessage).toBe(
      "O valor não pode ser nulo ou indefinido."
    );
  });
});
