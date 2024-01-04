import { UserProps } from './types/UserProps';
import Email from '@/shared/ValueObjects/Email';
import Entity from '@/shared/ValueObjects/Entity';
import PersonName from '@/shared/ValueObjects/PersonName';
import PasswordStrong from '@/shared/ValueObjects/PasswordStrong';

export default class User extends Entity<User, UserProps> {
  private readonly email: Email;
  private readonly name: PersonName;
  private readonly password: PasswordStrong;

  constructor(props: UserProps) {
    super(props);
    this.name = new PersonName({
      firstName: props.firstName,
      lastName: props.lastName,
    });
    this.email = new Email(props.email);
    this.password = new PasswordStrong(props.password);
  }
}
