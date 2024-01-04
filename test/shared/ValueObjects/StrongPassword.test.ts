import { notificationMessages } from '@/constants/NotificationMessages';
import StrongPassword from '@/shared/ValueObjects/StrongPassword';
import { ValidatorOutput } from '@/utils/Validator/types/Validator';

describe('Value Object - Strong Password', () => {
  let strongPassword: StrongPassword;

  const value = '@L_2456l';

  beforeEach(() => {
    jest.clearAllMocks();
    strongPassword = new StrongPassword(value);
  });

  describe('Creation', () => {
    it('should create a strong password instance with success', () => {
      expect(strongPassword).toBeInstanceOf(StrongPassword);
    });
  });

  describe('Getters', () => {
    it('should get a strong password value', () => {
      expect(strongPassword.getValue).toBe(value);
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

      const strongPassword = new StrongPassword(invalidValue);
      const result = strongPassword.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if it contains empty value', () => {
      const invalidValue = '';

      const message = notificationMessages.regex('Senha');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const strongPassword = new StrongPassword(invalidValue);
      const result = strongPassword.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if it contains only numbers', () => {
      const invalidValue = '123456789';

      const message = notificationMessages.regex('Senha');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const strongPassword = new StrongPassword(invalidValue);
      const result = strongPassword.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if it contains only letters', () => {
      const invalidValue = 'AaBbCcDdEeFf';

      const message = notificationMessages.regex('Senha');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const strongPassword = new StrongPassword(invalidValue);
      const result = strongPassword.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if it contains only special characters', () => {
      const invalidValue = '!@#$%"&*()_+';

      const message = notificationMessages.regex('Senha');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const strongPassword = new StrongPassword(invalidValue);
      const result = strongPassword.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications if contains less than 8 characters', () => {
      const invalidValue = '!S3nh4%';

      const message = notificationMessages.regex('Senha');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const strongPassword = new StrongPassword(invalidValue);
      const result = strongPassword.validate();

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return success for a valid value', () => {
      const expectedResult: ValidatorOutput = {
        success: true,
        notifications: [],
      };

      const result = strongPassword.validate();

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
