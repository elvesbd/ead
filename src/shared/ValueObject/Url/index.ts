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

    if (validator.isValid()) {
      this._url = new URL(value);
    } else {
      this._url = null;
    }
  }

  private get url(): URL | null {
    return this._url;
  }

  get value(): string {
    return this._value;
  }

  get protocol(): string | null {
    return this.url?.protocol ?? null;
  }

  get domain(): string | null {
    return this.url?.hostname ?? null;
  }

  get path(): string | null {
    return this.url?.pathname ?? null;
  }

  get params(): Record<string, string> | null {
    if (!this.url?.search) {
      return null;
    }

    const result: Record<string, string> = {};
    this.url.searchParams.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  }

  public getNotifications(): Record<string, string[]> {
    return this.groupedNotifications;
  }
}
