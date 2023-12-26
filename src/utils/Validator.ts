import ErrorValidation from "@/error/ErrorValidation";

export default class Validator {
  static notifications(
    ...errors: (ErrorValidation | null)[]
  ): ErrorValidation[] | null {
    const filteredErrors = errors.filter(
      (error) => error !== null
    ) as ErrorValidation[];
    return filteredErrors.length > 0 ? filteredErrors : null;
  }

  static isRequired<T>(
    value: T,
    errorMessage?: string
  ): ErrorValidation | null {
    const isValidValue = value !== null && value !== undefined;

    return isValidValue
      ? null
      : ErrorValidation.newError(
          errorMessage ?? "O valor é obrigatório!",
          value
        );
  }

  static isDefined<T>(value: T, errorMessage?: string): ErrorValidation | null {
    const isValidValue = value !== undefined && value !== null;

    return isValidValue
      ? null
      : ErrorValidation.newError(
          errorMessage ?? "O valor não pode ser indefinido!",
          value
        );
  }

  static isNotEmpty<T>(value: T, errorMessage?: string) {
    let isValidValue = true;

    switch (typeof value) {
      case "string":
        isValidValue = value.trim() !== "";
        break;

      case "number":
        isValidValue = !isNaN(value);
        break;

      case "boolean":
        isValidValue = value !== undefined && value !== null;
        break;

      case "object":
        if (value === null) {
          isValidValue = false;
        } else if (Array.isArray(value)) {
          isValidValue = value.length !== 0;
        }
        break;

      case "undefined":
        isValidValue = false;
        break;

      default:
        isValidValue = false;
        break;
    }

    return isValidValue
      ? null
      : ErrorValidation.newError(
          errorMessage ?? "O valor não pode ser vazio!",
          value
        );
  }

  static isShorterThan(
    value: string | string[],
    minLength: number,
    errorMessage?: string
  ): ErrorValidation | null {
    const isInvalidValue =
      (typeof value === "string" || Array.isArray(value)) &&
      value.length < minLength;

    return isInvalidValue
      ? ErrorValidation.newError(
          errorMessage ??
            `O valor não pode ter menos que ${minLength} caracteres!`,
          value,
          { minLength }
        )
      : null;
  }

  static isLongerThan(
    value: string | string[],
    maxLength: number,
    errorMessage?: string
  ): ErrorValidation | null {
    const isInvalidValue =
      (typeof value === "string" || Array.isArray(value)) &&
      value.length > maxLength;

    return isInvalidValue
      ? ErrorValidation.newError(
          errorMessage ??
            `O valor não pode ter mais que ${maxLength} caracteres!`,
          value,
          { maxLength }
        )
      : null;
  }

  static isNumber<T>(value: T, errorMessage?: string): ErrorValidation | null {
    const isValidValue = typeof value === "number" && !isNaN(value);

    return isValidValue
      ? null
      : ErrorValidation.newError(
          errorMessage ?? "O valor deve ser um número válido!",
          value
        );
  }

  static isString<T>(value: T, errorMessage?: string): ErrorValidation | null {
    const isValidValue = typeof value === "string";

    return isValidValue
      ? null
      : ErrorValidation.newError(
          errorMessage ?? "O valor deve ser do tipo string!"
        );
  }

  static matchesRegex(
    value: string,
    regex: RegExp,
    errorMessage?: string
  ): ErrorValidation | null {
    const isValidValue = typeof value === "string" && regex.test(value);

    return isValidValue
      ? null
      : ErrorValidation.newError(
          errorMessage ?? "O valor não corresponde ao padrão esperado!",
          value
        );
  }
}
