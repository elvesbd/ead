import Entity from '@/shared/ValueObjects/Entity';
import { UserProps } from './types/UserProps';
import PersonName from '@/shared/ValueObjects/PersonName';

export default class User extends Entity<User, UserProps> {
  private readonly name: PersonName;

  constructor(props: UserProps) {
    super(props);
    this.name = new PersonName(props);
  }
}
