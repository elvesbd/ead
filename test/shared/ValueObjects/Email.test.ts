import Email from '@/shared/ValueObject/Email';

describe('Value Object - Email', () => {
  let email: Email;
  const value = 'elves@mail.com';

  beforeEach(() => {
    jest.clearAllMocks();
    email = new Email(value);
  });

  describe('Creation', () => {
    it('should create a email instance with success', () => {
      expect(email).toBeInstanceOf(Email);
    });
  });

  describe('Getters', () => {
    it('should get a email value', () => {
      expect(email.getValue).toBe(value);
    });

    it('should get a email user', () => {
      expect(email.getUser).toBe('elves');
    });

    it('should get a email domain', () => {
      expect(email.getDomain).toBe('mail');
    });
  });

  describe('getNotifications()', () => {
    it('should return notifications for an without user value', () => {
      const invalidValue = '@mail.com';
      const email = new Email(invalidValue);
      const expectedResult = {
        Email: ['Email deve ser um endereço de e-mail válido!'],
      };

      const result = email.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an without domain value', () => {
      const invalidValue = 'elves@';
      const email = new Email(invalidValue);
      const expectedResult = {
        Email: ['Email deve ser um endereço de e-mail válido!'],
      };

      const result = email.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an empty value', () => {
      const invalidValue = '';
      const email = new Email(invalidValue);
      const expectedResult = {
        Email: ['Email deve ser um endereço de e-mail válido!'],
      };

      const result = email.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return empty notifications for a valid value', () => {
      const result = email.getNotifications();
      expect(result).toStrictEqual({});
    });
  });
});
