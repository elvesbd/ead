import { Output } from '@/utils/Notification/types/output';

export type ValidatorType = {
  isRequired<T>(value: T, key: string, errorMessage?: string): ValidatorType;
  isNotEmpty<T>(value: T, key: string, errorMessage?: string): ValidatorType;
  isShorterThan(
    value: string | string[],
    key: string,
    length: number,
    errorMessage?: string
  ): ValidatorType;
  isLongerThan(
    value: string | string[],
    key: string,
    length: number,
    errorMessage?: string
  ): ValidatorType;
  isNumber<T>(value: T, key: string, errorMessage?: string): ValidatorType;
  isString<T>(value: T, key: string, errorMessage?: string): ValidatorType;
  matchesRegex(
    value: string,
    regex: RegExp,
    key: string,
    errorMessage?: string
  ): ValidatorType;
  getValidationResult(): Output;
};
