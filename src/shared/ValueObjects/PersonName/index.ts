import Validator from '@/utils/Validator';
import { PersonNameProps } from './types/PersonNameProps';
import { ValidatorOutput } from '@/utils/Validator/types/Validator';

export default class PersonName {
  private readonly firstName: string;
  private readonly lastName: string;

  constructor(validation: Validator, props: PersonNameProps) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.validate(validation);
  }

  validate(validation: Validator): void {
    validation
      .isRequired(this.firstName, 'Nome')
      .isNotEmpty(this.firstName, 'Nome')
      .isLongerThan(this.firstName, 'Nome', 80)
      .isShorterThan(this.firstName, 'Nome', 3)
      .isString(this.firstName, 'Nome')
      .matchesRegex(this.firstName, /^[a-zA-ZÁ-ú'\-\s]*$/, 'Nome');

    validation
      .isRequired(this.lastName, 'Sobrenome')
      .isNotEmpty(this.lastName, 'Sobrenome')
      .isLongerThan(this.lastName, 'Sobrenome', 80)
      .isShorterThan(this.lastName, 'Sobrenome', 3)
      .isString(this.lastName, 'Sobrenome')
      .matchesRegex(this.lastName, /^[a-zA-ZÁ-ú'\-\s]*$/, 'Sobrenome');

    //return validation.getNotificationsOutput();
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
