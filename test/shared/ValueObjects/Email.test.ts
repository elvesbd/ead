import { notificationMessages } from '@/constants/NotificationMessages';
import Email from '@/shared/ValueObjects/Email';
import Validator from '@/utils/Validator';
import { ValidatorOutput } from '@/utils/Validator/types/Validator';

describe('Value Object - Email', () => {
  let email: Email;
  let validation: Validator;

  const value = 'elves@mail.com';

  beforeEach(() => {
    jest.clearAllMocks();
    email = new Email(value);
    validation = new Validator();
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
      expect(email.getEmailUser).toBe('elves');
    });

    it('should get a email domain', () => {
      expect(email.getEmailDomain).toBe('mail');
    });
  });

  describe('validate()', () => {
    it('should return success for a valid value', () => {
      const expectedResult: ValidatorOutput = {
        success: true,
        notifications: [],
      };

      const result = email.validate(validation);

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an without user value', () => {
      const invalidValue = '@mail.com';

      const message = notificationMessages.email('Email');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const email = new Email(invalidValue);
      const result = email.validate(validation);

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an without domain value', () => {
      const invalidValue = 'elves@';

      const message = notificationMessages.email('Email');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const email = new Email(invalidValue);
      const result = email.validate(validation);

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an empty value', () => {
      const invalidValue = '';

      const message = notificationMessages.email('Email');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const email = new Email(invalidValue);
      const result = email.validate(validation);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
