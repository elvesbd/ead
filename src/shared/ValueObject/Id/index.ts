import { v4 as uuid } from 'uuid';
import { ValueObject } from '@/shared/ValueObject';
import Validator from '@/utils/core-validator/Validator';

export default class Id extends ValueObject {
  private _value: string;

  public constructor(value?: string) {
    super();
    this._value = value ?? uuid();

    const validator = new Validator().isUUID(this._value, 'Id');
    this.addNotifications(validator.notifications);
  }

  get getValue() {
    return this._value;
  }

  public isEqual(id: Id) {
    return this._value === id._value;
  }

  public isDifferent(id: Id) {
    return this._value !== id._value;
  }

  public getNotifications(): Record<string, string[]> {
    return this.groupedNotifications;
  }
}
