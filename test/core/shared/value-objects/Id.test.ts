import Id from '@/core/shared/value-objects/Id';

describe('Value Object - Id', () => {
  it('should throw error if create invalid id', () => {
    const execute = () => new Id('123');
    expect(execute).toThrow(new Error('Invalid id!'));
  });

  it('should be compare if id is equals', () => {
    const id = new Id();
    const otherId = new Id(id.value);
    expect(id.isEquals(otherId)).toBeTruthy();
  });

  it('should be compare if id is different', () => {
    const id = new Id();
    const otherId = new Id(id.value);
    expect(id.isDifferent(otherId)).toBeFalsy();
  });

  it('should be compare if otherId is undefined', () => {
    const id = new Id();
    expect(id.isEquals(undefined as any)).toBeFalsy();
  });

  it('should be create valid id', () => {
    const id = new Id();
    expect(id.value).toBeDefined();
    expect(id.value).toHaveLength(36);
  });
});
