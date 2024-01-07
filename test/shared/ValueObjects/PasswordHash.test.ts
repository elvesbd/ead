import PasswordHash from '@/shared/ValueObject/PasswordHash';

describe('Value Object - Password Hash', () => {
  let passwordHash: PasswordHash;
  const value = '$2a$08$7iOUCtsgfKJhku7Iwm1dyeEoNzICTzQrg.UPLUShU.A7R4ylXkLc2';

  beforeEach(() => {
    jest.clearAllMocks();
    passwordHash = new PasswordHash(value);
  });

  describe('Creation', () => {
    it('should create a password hash instance with success', () => {
      expect(passwordHash).toBeInstanceOf(PasswordHash);
    });
  });

  describe('Getters', () => {
    it('should get a password hash value', () => {
      expect(passwordHash.getValue).toBe(value);
    });
  });

  describe('getNotifications()', () => {
    it('should return notifications if invalid password hash', () => {
      const invalidValue = '!S3nh4%';
      const passwordHash = new PasswordHash(invalidValue);
      const expectedResult = {
        Senha: ['Senha não corresponde ao padrão esperado!'],
      };

      const result = passwordHash.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return empty notifications for a valid password hash', () => {
      const expectedResult = {};

      const result = passwordHash.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
