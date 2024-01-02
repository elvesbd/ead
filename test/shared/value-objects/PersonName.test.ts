import PersonName from '@/shared/value-objects/PersonName';
import { PersonNameInput } from '@/shared/value-objects/PersonName/types/PersonNameInput';

describe('Value Object - PersonName', () => {
  let personName: PersonName;

  const props: PersonNameInput = {
    firstName: 'Elves',
    lastName: 'Brito',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    personName = new PersonName(props);
  });

  describe('getFirstName()', () => {
    it('should return first name with success', () => {
      expect(personName.getFirstName).toEqual(props.firstName);
    });
  });

  describe('getLastName()', () => {
    it('should return last name with success', () => {
      expect(personName.getLastName).toBe(props.lastName);
    });
  });

  describe('getInitials()', () => {
    it('should return initials name', () => {
      expect(personName.getInitials).toBe('EB');
    });
  });

  describe('validate()', () => {
    it('should ', () => {
      const expectedResult = {
        success: true,
        notifications: [],
      };

      expect(PersonName.validate(props)).toStrictEqual(expectedResult);
    });

    it('should ', async () => {
      const invalidProps: PersonNameInput = {
        firstName: '',
        lastName: 'Brito',
      };

      const expectedResult = {
        success: false,
        notifications: [
          'Nome não pode ser vazio!',
          'Nome não pode ter menos que 3 caracteres!',
        ],
      };

      expect(PersonName.validate(invalidProps)).toStrictEqual(expectedResult);
    });
  });
});
