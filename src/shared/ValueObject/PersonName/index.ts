import { ValueObject } from '@/shared/ValueObject';
import Validator from '@/utils/core-validator/Validator';
import { PersonNameProps } from './types/PersonNameProps';

export default class PersonName extends ValueObject {
  private _firstName: string;
  private _lastName: string;

  constructor(props: PersonNameProps) {
    super();
    this._firstName = props.firstName;
    this._lastName = props.lastName;

    const validator = new Validator()
      .isRequired(this._firstName, 'Nome')
      .isNotEmpty(this._firstName, 'Nome')
      .isLongerThan(this._firstName, 'Nome', 80)
      .isShorterThan(this._firstName, 'Nome', 3)
      .isString(this._firstName, 'Nome')
      .matchesRegex(this._firstName, /^[a-zA-ZÁ-ú'\-\s]*$/, 'Nome')
      .isRequired(this._lastName, 'Sobrenome')
      .isNotEmpty(this._lastName, 'Sobrenome')
      .isLongerThan(this._lastName, 'Sobrenome', 80)
      .isShorterThan(this._lastName, 'Sobrenome', 3)
      .isString(this._lastName, 'Sobrenome')
      .matchesRegex(this._lastName, /^[a-zA-ZÁ-ú'\-\s]*$/, 'Sobrenome');
    this.addNotifications(validator.notifications);
  }

  get getFirstName(): string {
    return this._firstName;
  }

  get getLastName(): string {
    return this._lastName;
  }

  get getInitials(): string {
    const firstLetter = this._firstName[0];
    const secondLetter = this._lastName[0];
    return `${firstLetter}${secondLetter}`;
  }

  public getNotifications(): Record<string, string[]> {
    return this.groupedNotifications;
  }
}
