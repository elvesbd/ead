import Validator from '@/utils/Validator';
import PersonName from '@/shared/ValueObjects/PersonName';
import { PersonNameProps } from '@/shared/ValueObjects/PersonName/types/PersonNameProps';

describe('Value Object - PersonName', () => {
  let personName: PersonName;
  let validation: Validator;

  const props: PersonNameProps = {
    firstName: 'Elves',
    lastName: 'Brito',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    personName = new PersonName(props);
    validation = new Validator();
  });

  describe('Creation', () => {
    it('should create a person name instance with success', () => {
      expect(personName).toBeInstanceOf(PersonName);
    });
  });

  describe('Getters', () => {
    it('should return first name with success', () => {
      expect(personName.getFirstName).toEqual(props.firstName);
    });

    it('should return last name with success', () => {
      expect(personName.getLastName).toBe(props.lastName);
    });

    it('should return initials name', () => {
      expect(personName.getInitials).toBe('EB');
    });
  });

  describe('validate()', () => {
    it('should return success for a valid person name', () => {
      const expectedResult = {
        success: true,
        notifications: [],
      };

      const result = personName.validate(validation);

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an invalid first name', async () => {
      const invalidProps: PersonNameProps = {
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

      const invalidPersonName = new PersonName(invalidProps);
      const result = invalidPersonName.validate(validation);

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an invalid last name', async () => {
      const invalidProps: PersonNameProps = {
        firstName: 'Elves',
        lastName: '',
      };

      const expectedResult = {
        success: false,
        notifications: [
          'Sobrenome não pode ser vazio!',
          'Sobrenome não pode ter menos que 3 caracteres!',
        ],
      };

      const invalidPersonName = new PersonName(invalidProps);
      const result = invalidPersonName.validate(validation);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
