import PersonName from '@/core/shared/value-objects/PersonName';
import { errorMessages } from '@/core/utils/Notifications/constants/error-messages';

describe('Value Object - PersonName', () => {
  it('should throw error if empty name', () => {
    const execute = () => new PersonName('');
    expect(execute).toThrow(errorMessages.empty);
  });

  it('should throw error if name less than 4 characters', () => {
    const shortName = 'Joh';
    const execute = () => new PersonName(shortName);
    const expectedErrorMessage = errorMessages.minLength.replace(
      '{0}',
      '4'
    );

    expect(execute).toThrow(expectedErrorMessage);
  });

  it('should throw error if name more than 120 characters', () => {
    const longName =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    const execute = () => new PersonName(longName);
    const expectedErrorMessage = errorMessages.maxLength.replace(
      '{0}',
      '120'
    );

    expect(execute).toThrow(expectedErrorMessage);
  });

  it('should throw error if name contains special characters', () => {
    const name = '@invalid name';
    const execute = () => new PersonName(name);
    const expectedErrorMessage = errorMessages.containsOnlyLetters;

    expect(execute).toThrow(expectedErrorMessage);
  });

  it('should create an name on success', () => {
    const result = new PersonName('John Doe');
    expect(result.fullName).toBe('John Doe');
  });

  it('should return an initials name', () => {
    const result = new PersonName('John Doe');
    expect(result.initials).toBe('JD');
  });
});
