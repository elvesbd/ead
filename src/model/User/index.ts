import { UserProps } from './types/UserProps';
import Email from '@/shared/ValueObjects/Email';
import Entity from '@/shared/ValueObjects/Entity';
import PersonName from '@/shared/ValueObjects/PersonName';
import PasswordHash from '@/shared/ValueObjects/PasswordHash';
import Validator from '@/utils/Validator';
import { ValidatorOutput } from '@/utils/Validator/types/Validator';
import Notification from '@/utils/Notification';

export default class User extends Entity<User, UserProps> {
  private readonly email: Email;
  private readonly name: PersonName;
  private readonly password: PasswordHash;
  private validation: Validator;
  private notifications: Notification;

  constructor(props: UserProps) {
    super(props);
    this.notifications = new Notification();
    this.validation = new Validator(this.notifications);

    this.name = new PersonName(this.validation, {
      firstName: props.firstName,
      lastName: props.lastName,
    });
    this.email = new Email(this.validation, props.email);
    this.password = new PasswordHash(this.validation, props.password);
  }

  hasNotifications(): boolean {
    return this.notifications.hasNotifications();
  }

  getNotifications(): string[] {
    return this.notifications.getNotifications();
  }

  get getUser(): UserProps {
    return {
      id: this.id.value,
      firstName: this.name.getFirstName,
      lastName: this.name.getLastName,
      email: this.email.getValue,
      password: this.password.getValue,
    };
  }

  validate(): any {
    //const validation = new Validator();
    /* this.name.validate(this.validation);
    this.email.validate(this.validation);
    this.password.validate(this.validation);

    return this.validation.getOutput(); */
  }
}
