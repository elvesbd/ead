import Validator from '@/utils/core-validator/Validator';
import { ValueObject } from '..';

export default class Duration extends ValueObject {
  private static readonly MINUTE: number = 60;
  private static readonly HOUR: number = 3600;
  private static readonly DAY: number = 86400;

  private _seconds: number;

  public constructor(seconds?: number) {
    super();
    this._seconds = seconds ?? 0;

    const validator = new Validator().isNegative(this._seconds, 'Duration');
    this.addNotifications(validator.notifications);
  }

  get zeroed(): boolean {
    return this._seconds === 0;
  }

  get formattedHourAndMinutes() {
    const { hours, minutes } = this.separatedParts;
    return `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m`;
  }

  get formattedHourAndMinutesAndSeconds() {
    const { hours, minutes, seconds } = this.separatedParts;
    return `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  }

  private get separatedParts() {
    return {
      hours: Math.floor(this._seconds / Duration.HOUR),
      minutes: Math.floor(this._seconds % Duration.HOUR) / Duration.MINUTE,
      seconds: this._seconds % Duration.MINUTE,
    };
  }

  sum(duration: Duration): Duration {
    return new Duration(this._seconds + duration._seconds);
  }

  isEqual(duration: Duration): boolean {
    return this._seconds === duration._seconds;
  }
}
