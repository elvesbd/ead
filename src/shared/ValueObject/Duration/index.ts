import { ValueObject } from '@/shared/ValueObject';
import { DurationParts } from './types/DurationParts';
import Validator from '@/utils/core-validator/Validator';
export default class Duration extends ValueObject {
  private static readonly MINUTE: number = 60;
  private static readonly HOUR: number = 3600;
  private static readonly DAY: number = 86400;

  private _seconds: number;

  public constructor(seconds: number) {
    super();
    this._seconds = seconds;

    const validator = new Validator().isMoreThan(this._seconds, 'Duration', 0);
    this.addNotifications(validator.notifications);
  }

  get value(): number {
    return this._seconds;
  }

  get formattedHourAndMinutes() {
    const { hours, minutes } = this.separatedParts();
    return `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m`;
  }

  get formattedHourAndMinutesAndSeconds() {
    const { hours, minutes, seconds } = this.separatedParts();
    return `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  }

  private separatedParts(): DurationParts {
    const hours = Math.floor(this._seconds / Duration.HOUR);
    const remainingSeconds = this._seconds % Duration.HOUR;
    const minutes = Math.floor(remainingSeconds / Duration.MINUTE);
    const seconds = remainingSeconds % Duration.MINUTE;
    return { hours, minutes, seconds };
  }

  public sum(duration: Duration): Duration {
    return new Duration(this._seconds + duration._seconds);
  }

  public isEqual(duration: Duration): boolean {
    return this._seconds === duration._seconds;
  }

  public getNotifications(): Record<string, string[]> {
    return this.groupedNotifications;
  }
}
