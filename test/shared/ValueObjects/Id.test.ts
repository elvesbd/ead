import Id from '@/shared/ValueObject/Id';

describe('Value Object - Id', () => {
  let id: Id;
  const value = 'dfce3e63-8c77-4cf3-90b8-0a63996ef10d';

  beforeEach(() => {
    jest.clearAllMocks();
    id = new Id(value);
  });

  describe('Creation()', () => {
    it('should create a id instance with success', () => {
      expect(id).toBeInstanceOf(Id);
    });

    it('should create a id on success', () => {
      expect(id.getValue).toBeDefined();
      expect(id.getValue).toHaveLength(36);
    });
  });

  describe('Getters()', () => {
    it('should get a id value', () => {
      expect(id.getValue).toBe(value);
    });
  });

  describe('getNotifications()', () => {
    it('should return notification when trying to create an ID with an invalid value', () => {
      const invalidId = '123';
      const id = new Id(invalidId);
      const expectedResult = {
        Id: ['Id deve ser um uuid válido!'],
      };

      const result = id.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return empty notifications for a valid value', () => {
      const result = id.getNotifications();
      expect(result).toStrictEqual({});
    });
  });

  describe('IsEqual()', () => {
    it('should returns return true if ids is equals', () => {
      const otherId = new Id(id.getValue);

      const result = id.isEqual(otherId);

      expect(result).toBeTruthy();
    });

    it('should returns return false if ids is not equals', () => {
      const otherId = new Id();

      const result = id.isEqual(otherId);

      expect(result).toBeFalsy();
    });
  });

  describe('isDifferent()', () => {
    it('should returns return false if ids is different', () => {
      const otherId = new Id(id.getValue);

      const result = id.isDifferent(otherId);

      expect(result).toBeFalsy();
    });

    it('should return true if ids is not different', () => {
      const otherId = new Id();

      const result = id.isDifferent(otherId);

      expect(result).toBeTruthy();
    });
  });
});
