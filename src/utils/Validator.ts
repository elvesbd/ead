import { errorMessages } from '@/constants/ErrorMessages';
import ErrorValidation from '@/error/ErrorValidation';

export default class Validator {
  private errors: (ErrorValidation | null)[] = [];

  constructor() {
    this.errors = [];
  }

  isRequired<T>(value: T, key: string, errorMessage?: string) {
    const isValidValue = value !== null && value !== undefined;
    if (!isValidValue) {
      this.errors.push(
        ErrorValidation.newError(
          errorMessage ?? errorMessages.required(key),
          value
        )
      );
    }

    return this;
  }

  isNotEmpty<T>(value: T, key: string, errorMessage?: string) {
    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '');

    let isValidValue = true;

    if (isEmpty) {
      isValidValue = false;
    }

    if (!isValidValue) {
      this.errors.push(
        ErrorValidation.newError(
          errorMessage ?? errorMessages.empty(key),
          value
        )
      );
    }

    return this;
  }

  isShorterThan(
    value: string | string[],
    key: string,
    length: number,
    errorMessage?: string
  ) {
    const isValidValue =
      (typeof value === 'string' || Array.isArray(value)) &&
      value.length < length;

    if (isValidValue) {
      this.errors.push(
        ErrorValidation.newError(
          errorMessage ?? errorMessages.minLength(length, key),
          value,
          { minlength: length }
        )
      );
    }
    return this;
  }

  isLongerThan(
    value: string | string[],
    key: string,
    length: number,
    errorMessage?: string
  ) {
    const isValidValue =
      (typeof value === 'string' || Array.isArray(value)) &&
      value.length > length;

    if (isValidValue) {
      this.errors.push(
        ErrorValidation.newError(
          errorMessage ?? errorMessages.maxLength(length, key),
          value,
          { maxLength: length }
        )
      );
    }
    return this;
  }

  isNumber<T>(value: T, key: string, errorMessage?: string) {
    const isValidValue = typeof value === 'number' && !isNaN(value);
    if (!isValidValue) {
      this.errors.push(
        ErrorValidation.newError(
          errorMessage ?? errorMessages.number(key),
          value
        )
      );
    }
    return this;
  }

  isString<T>(value: T, key: string, errorMessage?: string) {
    const isValidValue = typeof value === 'string';
    if (!isValidValue) {
      this.errors.push(
        ErrorValidation.newError(errorMessage ?? errorMessages.string(key))
      );
    }
    return this;
  }

  matchesRegex(
    value: string,
    regex: RegExp,
    key: string,
    errorMessage?: string
  ) {
    const isValidValue = typeof value === 'string' && regex.test(value);
    if (!isValidValue) {
      this.errors.push(
        ErrorValidation.newError(
          errorMessage ?? errorMessages.regex(key),
          value
        )
      );
    }
    return this;
  }

  build(): ErrorValidation[] | null {
    const filteredErrors = this.errors.filter(
      (error) => error !== null
    ) as ErrorValidation[];
    return filteredErrors.length > 0 ? filteredErrors : null;
  }
}
