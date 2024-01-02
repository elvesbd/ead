import Entity from '@/shared/value-objects/Entity';
import { EntityInput } from '@/shared/value-objects/Entity/types/EntityInput';
import Id from '@/shared/value-objects/Id';

interface EntitySPYInput extends EntityInput {
  name: string;
  age: number;
}

class EntitySPY extends Entity<EntitySPY, EntitySPYInput> {
  constructor(input: EntitySPYInput) {
    super(input);
  }
}

describe('Value Object - Entity', () => {
  const input = {
    name: 'Elves',
    age: 40,
  };

  it('should returns true if the entities have the same id', () => {
    const id = new Id().value;

    const entityOne = new EntitySPY({ id, name: input.name, age: input.age });
    const entityTwo = new EntitySPY({ id, name: input.name, age: input.age });

    expect(entityOne.isEqual(entityTwo)).toBeTruthy();
    expect(entityOne.isDifferent(entityTwo)).toBeFalsy();
  });

  it('should returns false if the entities have the not same id', () => {
    const idOne = new Id().value;
    const idTwo = new Id().value;

    const entityOne = new EntitySPY({
      id: idOne,
      name: input.name,
      age: input.age,
    });
    const entityTwo = new EntitySPY({
      id: idTwo,
      name: input.name,
      age: input.age,
    });

    expect(entityOne.isDifferent(entityTwo)).toBeTruthy();
    expect(entityOne.isEqual(entityTwo)).toBeFalsy();
  });

  it('should clone entity', () => {
    const id = new Id().value;

    const entity = new EntitySPY({ id, name: input.name, age: input.age });
    const result = entity.clone({ id, name: input.name, age: 30 });

    expect(result.id.value).toBe(entity.id.value);
    expect(result.props.name).toBe(entity.props.name);
    expect(result.props.age).toBe(30);
  });
});
