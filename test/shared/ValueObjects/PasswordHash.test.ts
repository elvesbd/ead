import Validator from '@/utils/Validator';
import { notificationMessages } from '@/constants/NotificationMessages';
import PasswordHash from '@/shared/ValueObjects/PasswordHash';
import { ValidatorOutput } from '@/utils/Validator/types/Validator';

describe('Value Object - Password Hash', () => {
  let passwordHash: PasswordHash;
  let validation: Validator;

  const value = '$2a$08$7iOUCtsgfKJhku7Iwm1dyeEoNzICTzQrg.UPLUShU.A7R4ylXkLc2';

  beforeEach(() => {
    jest.clearAllMocks();
    passwordHash = new PasswordHash(value);
    validation = new Validator();
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

  describe('validate()', () => {
    it('should return notifications if invalid password hash', () => {
      const invalidValue = '!S3nh4%';

      const message = notificationMessages.regex('Senha Hash');
      const expectedResult: ValidatorOutput = {
        success: false,
        notifications: [message],
      };

      const passwordHash = new PasswordHash(invalidValue);
      const result = passwordHash.validate(validation);

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return success for a valid password hash', () => {
      const expectedResult: ValidatorOutput = {
        success: true,
        notifications: [],
      };

      const result = passwordHash.validate(validation);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
