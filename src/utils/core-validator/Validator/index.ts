import Notification from '@/utils/core-validator/Notification';
import { Notifiable } from '@/utils/core-validator/Notifiable';
import { notificationMessages } from '@/utils/core-validator/messages/NotificationMessages';

export default class Validator extends Notifiable<Notification> {
  public isRequired(value: unknown, key: string, errorMessage?: string) {
    const isValidValue = value !== null && value !== undefined;
    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.required(key);
      this.addSingleNotification(key, message);
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
      this.addSingleNotification(key, message);
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
      this.addSingleNotification(key, message);
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
      this.addSingleNotification(key, message);
    }
    return this;
  }

  public isNumber(value: unknown, key: string, errorMessage?: string) {
    const isValidValue = typeof value === 'number' && !isNaN(value);
    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.number(key);
      this.addSingleNotification(key, message);
    }
    return this;
  }

  public isString(value: unknown, key: string, errorMessage?: string) {
    const isValidValue = typeof value === 'string';
    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.string(key);
      this.addSingleNotification(key, message);
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
      this.addSingleNotification(key, message);
    }
    return this;
  }

  public isEmail(value: unknown, key: string, errorMessage?: string) {
    const regex = /^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const valid = typeof value === 'string' && regex.test(value);
    if (!valid) {
      const message = errorMessage ?? notificationMessages.email(key);
      this.addSingleNotification(key, message);
    }

    return this;
  }

  public isUUID(value: unknown, key: string, errorMessage?: string) {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    const isValidValue = typeof value === 'string' && uuidRegex.test(value);
    if (!isValidValue) {
      const message = errorMessage ?? notificationMessages.uuid(key);
      this.addSingleNotification(key, message);
    }

    return this;
  }

  public addSingleNotification(key: string, message: string): void {
    const notificationInstance = new Notification(key, message);
    this.addNotification(notificationInstance);
  }
}
