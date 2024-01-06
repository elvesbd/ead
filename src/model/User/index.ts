import { UserProps } from './types/UserProps';
import Email from '@/shared/ValueObjects/Email';
import Entity from '@/shared/ValueObjects/Entity';
import PersonName from '@/shared/ValueObjects/PersonName';
import PasswordHash from '@/shared/ValueObjects/PasswordHash';
import Notification from '@/utils/Notification';

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

  get getValue(): UserProps {
    return {
      id: this.id.value,
      firstName: this.name.getFirstName,
      lastName: this.name.getLastName,
      email: this.email.getValue,
      password: this.password.getValue,
    };
  }

  isValid(): boolean {
    return (
      this.name.isValid() && this.email.isValid() && this.password.isValid()
    );
  }

  getNotifications(): Notification[] {
    return [
      ...this.name.getNotifications(),
      ...this.email.getNotifications(),
      ...this.password.getNotifications(),
    ];
  }
}
