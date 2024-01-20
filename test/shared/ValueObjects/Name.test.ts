import Name from '@/shared/ValueObject/Name';

describe('Value Object - Name', () => {
  let name: Name;
  const value = 'value';

  beforeEach(() => {
    jest.clearAllMocks();
    name = new Name(value);
  });

  describe('Creation', () => {
    it('should be create a name instance of success', () => {
      expect(name).toBeInstanceOf(Name);
    });
  });

  describe('Getters', () => {
    it('should return name with success', () => {
      expect(name.value).toBe(value);
    });
  });

  describe('Methods', () => {
    describe('formattedPascalCase()', () => {
      it('should return name formatted to pascal case', () => {
        const name = new Name('curso node');
        expect(name.formattedPascalCase()).toBe('Curso Node');
      });
    });

    describe('getNotifications()', () => {
      it('should return notifications for not string', async () => {
        const invalidValue = '';
        const name = new Name(invalidValue);
        const expectedResult = {
          Nome: [
            'Nome não pode ser vazio!',
            'Nome não pode ter menos que 5 caracteres!',
          ],
        };

        const result = name.getNotifications();

        expect(result).toStrictEqual(expectedResult);
      });

      it('should return success for a valid name', () => {
        const expectedResult = {};

        const result = name.getNotifications();

        expect(result).toStrictEqual(expectedResult);
      });
    });
  });
});
