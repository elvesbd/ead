import { ValueObject } from '@/shared/ValueObject';
import Validator from '@/utils/core-validator/Validator';

export default class Url extends ValueObject {
  private _value: string;
  private _url: URL | null = null;

  constructor(value: string) {
    super();
    this._value = value;

    const validator = new Validator().isUrl(this._value, 'Url');
    this.addNotifications(validator.notifications);

    if (validator.isValid()) this._url = new URL(this._value);
  }

  get value(): string {
    return this._value;
  }

  get protocol(): string {
    return this._url?.protocol ?? '';
  }

  get domain(): string {
    return this._url?.hostname ?? '';
  }

  get path(): string {
    return this._url?.pathname ?? '';
  }

  get params(): Record<string, string> {
    const result: Record<string, string> = {};

    if (this._url) {
      this._url.searchParams.forEach((value, key) => {
        result[key] = value;
      });
    }

    return result;
  }

  public getNotifications(): Record<string, string[]> {
    return this.groupedNotifications;
  }
}
