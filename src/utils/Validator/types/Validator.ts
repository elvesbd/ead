import { NotificationOutput } from '@/utils/Notification/types/Notification';

export type ValidatorOutput = NotificationOutput;
export type Validator = {
  isRequired<T>(value: T, key: string, errorMessage?: string): Validator;
  isNotEmpty<T>(value: T, key: string, errorMessage?: string): Validator;
  isShorterThan(
    value: string | string[],
    key: string,
    length: number,
    errorMessage?: string
  ): Validator;
  isLongerThan(
    value: string | string[],
    key: string,
    length: number,
    errorMessage?: string
  ): Validator;
  isNumber<T>(value: T, key: string, errorMessage?: string): Validator;
  isString<T>(value: T, key: string, errorMessage?: string): Validator;
  matchesRegex(
    value: string,
    regex: RegExp,
    key: string,
    errorMessage?: string
  ): Validator;
  getValidationOutput(): ValidatorOutput;
};
