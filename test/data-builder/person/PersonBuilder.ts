import { faker } from '@faker-js/faker';
import Id from '@/core/shared/value-objects/Id';
import { generate } from 'gerador-validador-cpf';
import Person, { PersonProps } from '@/core/person/Person';

export default class PersonBuilder {
  private constructor(private props: PersonProps) {}

  static create() {
    return new PersonBuilder({
      id: new Id().value,
      name: faker.person.fullName(),
      cpf: generate(),
    });
  }

  static createList(qtde: number = 10) {
    return Array(qtde)
      .fill(0)
      .map(() => {
        return PersonBuilder.create().build();
      });
  }

  withId(id: string): this {
    this.props.id = id;
    return this;
  }

  withOutId(): this {
    this.props.id = undefined;
    return this;
  }

  withNameUpdated(name: string): this {
    this.props.name = name;
    return this;
  }

  withCPF(cpf: string): this {
    this.props.cpf = cpf;
    return this;
  }

  withOutCPF(): this {
    this.props.cpf = undefined as any;
    return this;
  }

  build(): Person {
    return new Person(this.props);
  }
}
