import { ValueObject } from '@/shared/ValueObject';
import Validator from '@/utils/core-validator/Validator';

export default class Position extends ValueObject {
  private _value: number;

  constructor(value: number) {
    super();
    this._value = value;

    const validator = new Validator()
      .isNumber(this._value, 'Position')
      .isRequired(this._value, 'Position')
      .isMoreThan(this._value, 'Position', 0);
    this.addNotifications(validator.notifications);
  }

  public get value(): number {
    return this._value;
  }

  public isEqual(otherPosition: Position): boolean {
    return this._value === otherPosition.value;
  }

  public isDifferent(otherPosition: Position): boolean {
    return this._value !== otherPosition.value;
  }

  public compare(otherPosition: Position): number {
    if (this.isEqual(otherPosition)) return 0;
    return this._value > otherPosition.value ? 1 : -1;
  }

  public sorting(positions: Position[]): Position[] {
    return positions.sort((a, b) => a.compare(b));
  }

  public getNotifications(): Record<string, string[]> {
    return this.groupedNotifications;
  }
}
