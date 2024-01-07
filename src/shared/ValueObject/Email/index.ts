import { ValueObject } from '@/shared/ValueObject';
import Validator from '@/utils/core-validator/Validator';

export default class Email extends ValueObject {
  private _value: string;

  public constructor(value: string) {
    super();
    this._value = value.trim();

    const validator = new Validator().isEmail(this._value, 'Email');
    this.addNotifications(validator.notifications);
  }

  get getValue(): string {
    return this._value;
  }

  get getUser(): string {
    return this._value.split('@')[0];
  }

  get getDomain(): string {
    const domain = this._value.split('@')[1];
    return domain.split('.')[0];
  }

  public getNotifications(): Record<string, string[]> {
    return this.groupedNotifications;
  }
}
