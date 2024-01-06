import Validator from '@/utils/Validator';
import { ValueObject } from '../ValueObject';

export default class PasswordHash extends ValueObject {
  private _value: string;

  public constructor(value: string) {
    super();
    this._value = value;

    const validator = new Validator().matchesRegex(
      this._value,
      /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/,
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
