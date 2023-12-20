import ErrorValidation from "@/error/ErrorValidation";

export default class Validator {
  static NotNull(
    value: any,
    errorMessage: string = "O valor não pode ser nulo ou indefinido."
  ): ErrorValidation | null {
    const isValid =
      value !== null &&
      value !== undefined &&
      (typeof value !== "string" || value.trim() !== "");

    return isValid ? null : ErrorValidation.newError(errorMessage, value);
  }
}
