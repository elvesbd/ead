import { PersonNameProps } from './types/PersonNameProps';
import PersonNameValidatorFacade from '@/utils/facades/PersonNameValidatorFacade';

export default class PersonName {
  readonly firstName: string;
  readonly lastName: string;

  constructor(props: PersonNameProps) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;

    PersonNameValidatorFacade.validateProps(props);
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
