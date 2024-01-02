import Notification from '@/utils/Notification';
import { PersonNameInput } from './types/PersonNameInput';
import PersonNameValidator from './PersonNameValidator';
import Validator from '@/utils/Validator';
import { Output } from '@/utils/Notification/types/output';

export default class PersonName {
  readonly firstName: string;
  readonly lastName: string;

  constructor(input: PersonNameInput) {
    this.firstName = input.firstName;
    this.lastName = input.lastName;
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

  static validate(input: PersonNameInput): Output {
    const notification = new Notification();
    const validator = new Validator(notification);
    const personName = new PersonNameValidator(validator);
    personName.validateProps(input);

    return notification.getResult();
  }
}
