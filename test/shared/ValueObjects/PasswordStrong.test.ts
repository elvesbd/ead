import PasswordStrong from '@/shared/ValueObject/PasswordStrong';

describe('Value Object - Password Strong', () => {
  let passwordStrong: PasswordStrong;
  const value = '@L_2456l';

  beforeEach(() => {
    jest.clearAllMocks();
    passwordStrong = new PasswordStrong(value);
  });

  describe('Creation', () => {
    it('should create a password strong instance with success', () => {
      expect(passwordStrong).toBeInstanceOf(PasswordStrong);
    });
  });

  describe('Getters', () => {
    it('should get a password strong value', () => {
      expect(passwordStrong.getValue).toBe(value);
    });
  });

  describe('getNotifications()', () => {
    it('should return notifications if it contains empty value', () => {
      const invalidValue = '';
      const passwordStrong = new PasswordStrong(invalidValue);
      const expectedResult = {
        Senha: ['Senha não corresponde ao padrão esperado!'],
      };

      const result = passwordStrong.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if it contains only numbers', () => {
      const invalidValue = '123456789';
      const passwordStrong = new PasswordStrong(invalidValue);
      const expectedResult = {
        Senha: ['Senha não corresponde ao padrão esperado!'],
      };

      const result = passwordStrong.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if it contains only letters', () => {
      const invalidValue = 'AaBbCcDdEeFf';
      const passwordStrong = new PasswordStrong(invalidValue);
      const expectedResult = {
        Senha: ['Senha não corresponde ao padrão esperado!'],
      };

      const result = passwordStrong.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if it contains only special characters', () => {
      const invalidValue = '!@#$%"&*()_+';
      const passwordStrong = new PasswordStrong(invalidValue);
      const expectedResult = {
        Senha: ['Senha não corresponde ao padrão esperado!'],
      };

      const result = passwordStrong.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if contains less than 8 characters', () => {
      const invalidValue = '!S3nh4%';
      const passwordStrong = new PasswordStrong(invalidValue);
      const expectedResult = {
        Senha: ['Senha não corresponde ao padrão esperado!'],
      };

      const result = passwordStrong.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return empty notifications for a valid value', () => {
      const expectedResult = {};

      const result = passwordStrong.getNotifications();

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
