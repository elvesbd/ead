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

  static NotNull(
    value: any,
    errorMessage: string = "O valor não pode ser nulo ou indefinido!"
  ): ErrorValidation | null {
    const isValid =
      value !== null &&
      value !== undefined &&
      (typeof value !== "string" || value.trim() !== "");

    return isValid ? null : ErrorValidation.newError(errorMessage, value);
  }

  static isNotEmpty(
    value: string | null | undefined,
    errorMessage: string = "O valor não pode ser vazio!"
  ): ErrorValidation | null {
    if (Validator.NotNull(value, errorMessage))
      return ErrorValidation.newError(errorMessage, value);

    return value?.trim() !== ""
      ? null
      : ErrorValidation.newError(errorMessage, value);
  }

  static isLessThan(
    value: string | string[],
    maxLength: number,
    errorMessage: string = `O valor não pode ser menor que ${maxLength}`
  ): ErrorValidation | null {
    return value.length < maxLength
      ? null
      : ErrorValidation.newError(errorMessage, value, { max: maxLength });
  }

  static isMoreThan(
    value: string | string[],
    minLength: number,
    errorMessage: string = `O valor não pode ser maior que ${minLength}`
  ): ErrorValidation | null {
    return value.length > minLength
      ? null
      : ErrorValidation.newError(errorMessage, value, { min: minLength });
  }

  static isRegex(
    value: string,
    regex: RegExp,
    errorMessage: string
  ): ErrorValidation | null {
    return regex.test(value)
      ? null
      : ErrorValidation.newError(errorMessage, value);
  }
}
