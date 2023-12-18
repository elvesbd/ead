import Cpf from '../shared/value-objects/Cpf';
import PersonName from '../shared/value-objects/PersonName';
import Entity, { EntityProps } from '../shared/entities/Entity';

export type PersonProps = {
  cpf: string;
  name: string;
} & EntityProps;

export default class Person extends Entity<Person, PersonProps> {
  readonly cpf: Cpf;
  readonly name: PersonName;

  constructor(props: PersonProps) {
    super(props);
    this.cpf = new Cpf(props.cpf);
    this.name = new PersonName(props.name);
  }
}
