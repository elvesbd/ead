import Id from '@/shared/value-objects/Id';

describe('Value Object - Id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should returns create an new valid id', () => {
    const id = new Id();

    expect(id.value).toBeDefined();
    expect(id.value).toHaveLength(36);
  });

  it('should returns throwing error if trying create an invalid id', () => {
    const execute = () => new Id('123');
    expect(execute).toThrow('Invalid Id');
  });

  it('should returns return true if ids is equals', () => {
    const idOne = new Id();
    const idTwo = new Id(idOne.value);

    expect(idOne.isEqual(idTwo)).toBeTruthy();
  });

  it('should returns return false if ids is not equals', () => {
    const idOne = new Id();
    const idTwo = new Id();

    expect(idOne.isEqual(idTwo)).toBeFalsy();
  });

  it('should returns return false if ids is different', () => {
    const idOne = new Id();
    const idTwo = new Id(idOne.value);

    expect(idOne.isDifferent(idTwo)).toBeFalsy();
  });

  it('should returns return true if ids is not different', () => {
    const idOne = new Id();
    const idTwo = new Id();

    expect(idOne.isDifferent(idTwo)).toBeTruthy();
  });
});
