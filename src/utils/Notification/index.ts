export default class Notification {
  private _key: string;
  private _message: string;

  constructor(key: string, message: string) {
    this._key = key;
    this._message = message;
  }

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
