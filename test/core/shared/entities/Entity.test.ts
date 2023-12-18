import Entity, { EntityProps } from '@/core/shared/entities/Entity';

type TestProps = {
  name: string;
  age: number;
} & EntityProps;

class EntitySpy extends Entity<EntitySpy, TestProps> {
  readonly name: string;
  readonly age: number;

  constructor(props: TestProps) {
    super(props);
    this.name = props.name ?? '';
    this.age = props.age ?? 0;
  }
}

describe('Entity', () => {
  it('should be compare two different entities', () => {
    const entitySpyOne = new EntitySpy({ name: 'Elvis', age: 40 });
    const entitySpyTwo = new EntitySpy({ name: 'Elvis', age: 40 });

    expect(entitySpyOne.isEquals(entitySpyTwo)).toBeFalsy();
    expect(entitySpyTwo.isDifferent(entitySpyOne)).toBeTruthy();
  });

  it('should be returns false when checking equality if informed entity is undefined', () => {
    const entitySpy = new EntitySpy({ name: 'Elvis', age: 40 });

    expect(entitySpy.isEquals(undefined as any)).toBeFalsy();
  });

  it('should be returns false when checking difference if informed entity is undefined', () => {
    const entitySpy = new EntitySpy({ name: 'Elvis', age: 40 });

    expect(entitySpy.isDifferent(undefined as any)).toBeTruthy();
  });

  it('should be clone an entity with different name', () => {
    const entitySpyOne = new EntitySpy({ name: 'Elvis', age: 40 });
    const entitySpyTwo = entitySpyOne.clone({
      name: 'John',
      age: 40,
    });

    expect(entitySpyTwo.id.value).toBe(entitySpyOne.id.value);
    expect(entitySpyTwo.age).toBe(entitySpyOne.age);
    expect(entitySpyTwo.name).not.toBe(entitySpyOne.name);
  });

  it('should be clone an entity with different age', () => {
    const entitySpyOne = new EntitySpy({ name: 'Elvis', age: 40 });
    const entitySpyTwo = entitySpyOne.clone({
      name: 'Elvis',
      age: 30,
    });

    expect(entitySpyTwo.id.value).toBe(entitySpyOne.id.value);
    expect(entitySpyTwo.name).toBe(entitySpyOne.name);
    expect(entitySpyTwo.age).not.toBe(entitySpyOne.age);
  });
});
