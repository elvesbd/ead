import { faker } from '@faker-js/faker';
import { UserProps } from '@/model/User/types/UserProps';

export default class UserBuilder {
  private props: UserProps = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 60,
      pattern: /[A-Za-z0-9\.\/]/,
      prefix: '$2a$12$',
    }),
  };

  public static aUser(): UserBuilder {
    return new UserBuilder();
  }

  public withoutId(): this {
    this.props.id = undefined;
    return this;
  }

  public withInvalidName(): this {
    this.props.firstName = '';
    return this;
  }

  public withInvalidEmail(): this {
    this.props.email = '@mail.com';
    return this;
  }

  public withInvalidPassword(): this {
    this.props.password = '1234567';
    return this;
  }

  public build(): UserProps {
    return this.props;
  }
}
