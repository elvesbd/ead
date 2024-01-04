import Notification from '../Notification';
import { ValidatorOutput } from './types/Validator';
import { notificationMessages } from '@/constants/NotificationMessages';

export default class Validator extends Notification {
  public isRequired<T>(value: T, key: string, errorMessage?: string) {
    const isValidValue = value !== null && value !== undefined;
    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.required(key);
      this.addNotification(message);
    }

    return this;
  }

  public isNotEmpty<T>(value: T, key: string, errorMessage?: string) {
    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '');

    let isValidValue = true;

    if (isEmpty) {
      isValidValue = false;
    }

    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.empty(key);
      this.addNotification(message);
    }

    return this;
  }

  public isShorterThan(
    value: string | string[],
    key: string,
    length: number,
    errorMessage?: string
  ) {
    const isValidValue =
      (typeof value === 'string' || Array.isArray(value)) &&
      value.length < length;

    if (isValidValue) {
      const message =
        errorMessage ?? notificationMessages.minLength(length, key);
      this.addNotification(message);
    }

    return this;
  }

  public isLongerThan(
    value: string | string[],
    key: string,
    length: number,
    errorMessage?: string
  ) {
    const isValidValue =
      (typeof value === 'string' || Array.isArray(value)) &&
      value.length > length;

    if (isValidValue) {
      const message =
        errorMessage ?? notificationMessages.maxLength(length, key);
      this.addNotification(message);
    }
    return this;
  }

  public isNumber<T>(value: T, key: string, errorMessage?: string) {
    const isValidValue = typeof value === 'number' && !isNaN(value);
    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.number(key);
      this.addNotification(message);
    }
    return this;
  }

  public isString<T>(value: T, key: string, errorMessage?: string) {
    const isValidValue = typeof value === 'string';
    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.string(key);
      this.addNotification(message);
    }

    return this;
  }

  public matchesRegex(
    value: string,
    regex: RegExp,
    key: string,
    errorMessage?: string
  ) {
    const isValidValue = typeof value === 'string' && regex.test(value);
    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.regex(key);
      this.addNotification(message);
    }
    return this;
  }

  public getOutput(): ValidatorOutput {
    return this.getNotificationsOutput();
  }
}
