import { UserProps } from './types/UserProps';
import Email from '@/shared/ValueObjects/Email';
import Entity from '@/shared/ValueObjects/Entity';
import PersonName from '@/shared/ValueObjects/PersonName';
import PasswordHash from '@/shared/ValueObjects/PasswordHash';
import Validator from '@/utils/Validator';
import { ValidatorOutput } from '@/utils/Validator/types/Validator';

export default class User extends Entity<User, UserProps> {
  private readonly email: Email;
  private readonly name: PersonName;
  private readonly password: PasswordHash;

  constructor(props: UserProps) {
    super(props);

    this.name = new PersonName({
      firstName: props.firstName,
      lastName: props.lastName,
    });
    this.email = new Email(props.email);
    this.password = new PasswordHash(props.password);
  }

  validate(): ValidatorOutput {
    const validation = new Validator();

    this.name.validate(validation);
    this.email.validate(validation);
    this.password.validate(validation);

    return validation.getOutput();
  }
}
