import { ErrorKey } from './types/ErrorKey';
import { errorMessages } from './constants/error-messages';

export default class Notification {
  static notifications(
    ...errors: (string | null)[]
  ): string[] | null {
    const filterErrors = errors.filter(
      (error) => error !== null
    ) as string[];
    return filterErrors.length > 0 ? filterErrors : null;
  }

  static isOnlyLetters(
    value: string,
    customErrorMessage?: string
  ): string | null {
    const regex = /^[a-zA-ZÀ-ú'-\.\s]+$/;
    const errorMessage =
      customErrorMessage ?? errorMessages.containsOnlyLetters;
    return regex.test(value) ? null : errorMessage;
  }

  static isNull(
    value: any,
    errorKey: ErrorKey = 'required'
  ): string | null {
    return value === null || value === undefined
      ? errorMessages[errorKey]
      : null;
  }

  static isEmpty(
    value: string,
    errorKey: ErrorKey = 'empty'
  ): string | null {
    return value.trim() === '' ? errorMessages[errorKey] : null;
  }

  static isLessThan(
    value: string | any[],
    minLength: number,
    errorKey: ErrorKey = 'minLength'
  ): string | null {
    const errorMessage = errorMessages[errorKey].replace(
      '{0}',
      minLength.toString()
    );
    return value.length < minLength ? errorMessage : null;
  }

  static isMoreThan(
    value: string | any[],
    maxLength: number,
    customErrorMessage?: string
  ): string | null {
    const errorMessage =
      customErrorMessage ??
      errorMessages.maxLength.replace('{0}', maxLength.toString());
    return value.length > maxLength ? errorMessage : null;
  }

  static isValidEmail(
    email: string,
    errorKey: ErrorKey = 'invalidEmail'
  ): string | null {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email) ? null : errorMessages[errorKey];
  }
}
