import Validator from '@/utils/core-validator/Validator';
import { ValueObject } from '..';

export default class Name extends ValueObject {
  private _value: string;

  constructor(value: string) {
    super();
    this._value = value;

    const validator = new Validator()
      .isString(this._value, 'Nome')
      .isRequired(this._value, 'Nome')
      .isNotEmpty(this._value, 'Nome')
      .isLongerThan(this._value, 'Nome', 80)
      .isShorterThan(this._value, 'Nome', 3);
    this.addNotifications(validator.notifications);
  }

  get name(): string {
    return this._value;
  }

  get formattedPascalCase(): string {
    const capitalizeFirstLetter = (name: string) =>
      name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();

    return this._value.split(' ').map(capitalizeFirstLetter).join(' ');
  }
}
