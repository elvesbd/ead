import PersonBuilder from '@/test/data-builder/person/PersonBuilder';

describe('Domain - Person', () => {
  it('should create name on success', () => {
    const person = PersonBuilder.create().build();

    expect(person.id.value).toBeDefined();
    expect(person.cpf.value).toBe(person.cpf.value);
    expect(person.name.fullName).toBe(person.name.fullName);
  });

  it('should be clone object with name updated', () => {
    const person = PersonBuilder.create().build();
    const newPerson = person.clone({ name: 'Elvis Brito' });

    expect(newPerson.id.value).toBe(person.id.value);
    expect(newPerson.cpf.value).toBe(person.cpf.value);
    expect(newPerson.name.fullName).toBe('Elvis Brito');
    expect(newPerson.name.fullName).not.toBe(person.name.fullName);
  });
});
