import Validator from '@/utils/Validator';
import { ValueObject } from '../ValueObject';
import { PersonNameProps } from './types/PersonNameProps';

export default class PersonName extends ValueObject {
  private readonly firstName: string;
  private readonly lastName: string;

  constructor(props: PersonNameProps) {
    super();
    this.firstName = props.firstName;
    this.lastName = props.lastName;

    const validation = new Validator()
      .isRequired(this.firstName, 'Nome')
      .isNotEmpty(this.firstName, 'Nome')
      .isLongerThan(this.firstName, 'Nome', 80)
      .isShorterThan(this.firstName, 'Nome', 3)
      .isString(this.firstName, 'Nome')
      .matchesRegex(this.firstName, /^[a-zA-ZÁ-ú'\-\s]*$/, 'Nome')
      .isRequired(this.lastName, 'Sobrenome')
      .isNotEmpty(this.lastName, 'Sobrenome')
      .isLongerThan(this.lastName, 'Sobrenome', 80)
      .isShorterThan(this.lastName, 'Sobrenome', 3)
      .isString(this.lastName, 'Sobrenome')
      .matchesRegex(this.lastName, /^[a-zA-ZÁ-ú'\-\s]*$/, 'Sobrenome');

    this.addNotifications(validation.notifications);
  }

  get getFirstName() {
    return this.firstName;
  }

  get getLastName() {
    return this.lastName;
  }

  get getInitials() {
    const firstLetter = this.firstName[0];
    const secondLetter = this.lastName[0];
    return `${firstLetter}${secondLetter}`;
  }
}
