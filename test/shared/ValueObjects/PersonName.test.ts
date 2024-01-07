import PersonName from '@/shared/ValueObject/PersonName';
import { PersonNameProps } from '@/shared/ValueObject/PersonName/types/PersonNameProps';

describe('Value Object - PersonName', () => {
  let personName: PersonName;

  const props: PersonNameProps = {
    firstName: 'Elves',
    lastName: 'Brito',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    personName = new PersonName(props);
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

  describe('getNotifications()', () => {
    it('should return notifications for an invalid first name', async () => {
      const invalidProps: PersonNameProps = {
        firstName: '',
        lastName: 'Brito',
      };
      const invalidPersonName = new PersonName(invalidProps);
      const expectedResult = {
        Nome: [
          'Nome não pode ser vazio!',
          'Nome não pode ter menos que 3 caracteres!',
        ],
      };

      const result = invalidPersonName.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an invalid last name', async () => {
      const invalidProps: PersonNameProps = {
        firstName: 'Elves',
        lastName: '',
      };
      const invalidPersonName = new PersonName(invalidProps);
      const expectedResult = {
        Sobrenome: [
          'Sobrenome não pode ser vazio!',
          'Sobrenome não pode ter menos que 3 caracteres!',
        ],
      };

      const result = invalidPersonName.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return success for a valid person name', () => {
      const expectedResult = {};

      const result = personName.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
