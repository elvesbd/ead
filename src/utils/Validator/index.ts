import Notification from '../Notification';
import { ValidatorOutput } from './types/Validator';
import { notificationMessages } from '@/constants/NotificationMessages';

export default class Validator extends Notification {
  public isRequired(value: unknown, key: string, errorMessage?: string) {
    const isValidValue = value !== null && value !== undefined;
    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.required(key);
      this.addNotification(message);
    }

    return this;
  }

  public isNotEmpty(value: unknown, key: string, errorMessage?: string) {
    const empty =
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '');

    if (empty) {
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

  public isNumber(value: unknown, key: string, errorMessage?: string) {
    const isValidValue = typeof value === 'number' && !isNaN(value);
    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.number(key);
      this.addNotification(message);
    }
    return this;
  }

  public isString(value: unknown, key: string, errorMessage?: string) {
    const isValidValue = typeof value === 'string';
    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.string(key);
      this.addNotification(message);
    }

    return this;
  }

  public matchesRegex(
    value: unknown,
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

  public isEmail(value: unknown, errorMessage?: string) {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const valid = typeof value === 'string' && regex.test(value);
    if (!valid) {
      const message = errorMessage ?? notificationMessages.email();
      this.addNotification(message);
    }

    return this;
  }

  public getOutput(): ValidatorOutput {
    return this.getNotificationsOutput();
  }
}
