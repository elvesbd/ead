import { UserProps } from './types/UserProps';
import Email from '@/shared/ValueObject/Email';
import Entity from '@/shared/ValueObject/Entity';
import PersonName from '@/shared/ValueObject/PersonName';
import PasswordHash from '@/shared/ValueObject/PasswordHash';

export default class User extends Entity<User, UserProps> {
  private _email: Email;
  private _name: PersonName;
  private _password: PasswordHash;

  public constructor(props: UserProps) {
    super(props);

    this._name = new PersonName({
      firstName: props.firstName,
      lastName: props.lastName,
    });
    this._email = new Email(props.email);
    this._password = new PasswordHash(props.password);
  }

  public getUserProps(): UserProps {
    return {
      id: this._id.getValue,
      firstName: this._name.getFirstName,
      lastName: this._name.getLastName,
      email: this._email.getValue,
      password: this._password.getValue,
    };
  }

  public isValid(): boolean {
    return (
      this._id.isValid() &&
      this._name.isValid() &&
      this._email.isValid() &&
      this._password.isValid()
    );
  }

  get notifications(): Record<string, string[]> {
    return {
      ...this._id.getNotifications(),
      ...this._name.getNotifications(),
      ...this._email.getNotifications(),
      ...this._password.getNotifications(),
    };
  }
}
