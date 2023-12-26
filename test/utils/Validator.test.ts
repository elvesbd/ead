import Validator from "@/utils/Validator";

describe("Validator", () => {
  it("ensures returns null if value is given", () => {
    const error = Validator.isRequired("Good morning");

    expect(error).toBeNull();
  });

  it("ensures error validation if value is null", () => {
    const error = Validator.isRequired(null, "O valor não pode ser nulo!");
    expect(error).not.toBeNull();
    expect(error?.errorMessage).toBe("O valor não pode ser nulo!");
  });

  it("ensures error validation if value is undefined", () => {
    const error = Validator.isRequired(
      undefined,
      "O valor não pode ser undefined!"
    );
    expect(error).not.toBeNull();
    expect(error?.errorMessage).toBe("O valor não pode ser undefined!");
  });

  it("ensures returns default error message", () => {
    const error = Validator.isRequired(null);

    expect(error).not.toBeNull();
    expect(error?.errorMessage).toBe("O valor é obrigatório!");
  });
});
