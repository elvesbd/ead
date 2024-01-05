import { notificationMessages } from '@/constants/NotificationMessages';
import PasswordStrong from '@/shared/ValueObjects/PasswordStrong';
import { ValidatorOutput } from '@/utils/Validator/types/Validator';

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

  describe('validate()', () => {
    it('should return notifications for an without user value', () => {
      const invalidValue = '@mail.com';

      const message = notificationMessages.regex('Senha');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const passwordStrong = new PasswordStrong(invalidValue);
      const result = passwordStrong.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if it contains empty value', () => {
      const invalidValue = '';

      const message = notificationMessages.regex('Senha');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const passwordStrong = new PasswordStrong(invalidValue);
      const result = passwordStrong.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if it contains only numbers', () => {
      const invalidValue = '123456789';

      const message = notificationMessages.regex('Senha');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const passwordStrong = new PasswordStrong(invalidValue);
      const result = passwordStrong.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if it contains only letters', () => {
      const invalidValue = 'AaBbCcDdEeFf';

      const message = notificationMessages.regex('Senha');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const passwordStrong = new PasswordStrong(invalidValue);
      const result = passwordStrong.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if it contains only special characters', () => {
      const invalidValue = '!@#$%"&*()_+';

      const message = notificationMessages.regex('Senha');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const passwordStrong = new PasswordStrong(invalidValue);
      const result = passwordStrong.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if contains less than 8 characters', () => {
      const invalidValue = '!S3nh4%';

      const message = notificationMessages.regex('Senha');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const passwordStrong = new PasswordStrong(invalidValue);
      const result = passwordStrong.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return success for a valid value', () => {
      const expectedResult: ValidatorOutput = {
        success: true,
        notifications: [],
      };

      const result = passwordStrong.validate();

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
