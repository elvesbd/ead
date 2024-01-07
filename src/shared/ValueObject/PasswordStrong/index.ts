import { ValueObject } from '@/shared/ValueObject';
import Validator from '@/utils/core-validator/Validator';

export default class PasswordStrong extends ValueObject {
  private _value: string;

  public constructor(value: string) {
    super();
    this._value = value;

    const validator = new Validator().matchesRegex(
      this._value,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Senha'
    );
    this.addNotifications(validator.notifications);
  }

  get getValue(): string {
    return this._value;
  }

  public getNotifications(): Record<string, string[]> {
    return this.groupedNotifications;
  }
}
