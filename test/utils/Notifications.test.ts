import Notification from '@/core/utils/Notifications';

describe('Notification', () => {
  it('should return an errors list if at least one validation error exists', () => {
    const errors = Notification.notifications(
      Notification.isEmpty(' '),
      Notification.isEmpty('value')
    );
    expect(errors?.join(', ')).toBe('O campo não pode estar vazio.');
    expect(errors?.length).toBe(1);
  });

  it('should return null if there are no validation errors', () => {
    const errors = Notification.notifications(
      Notification.isEmpty('value'),
      Notification.isEmpty('value')
    );
    expect(errors).toBeNull();
  });

  it('should return error if value contains special characters', () => {
    const value = '@invalid';
    const error = Notification.isOnlyLetters(value);
    expect(error).not.toBeNull();
    expect(error).toBe('O campo deve conter apenas letras.');
  });

  it('should return error with custom error message if value contains special characters', () => {
    const value = '@invalid';
    const error = Notification.isOnlyLetters(
      value,
      'custom error message'
    );
    expect(error).not.toBeNull();
    expect(error).toBe('custom error message');
  });

  it('should return null if value not contains special characters', () => {
    const value = 'John Doe';
    const error = Notification.isOnlyLetters(value);
    expect(error).toBeNull();
  });

  it('should return null if value is not null', () => {
    const error = Notification.isNull('value');
    expect(error).toBeNull();
  });

  it('should return an error message if value is null', () => {
    const error = Notification.isNull(null);
    expect(error).not.toBeNull();
    expect(error).toBe('O campo é obrigatório.');
  });

  it('should return null if text is not empty', () => {
    const error = Notification.isEmpty('value');
    expect(error).toBeNull();
  });

  it('should return an error message if text is empty', () => {
    const error = Notification.isEmpty(' ');
    expect(error).not.toBeNull();
    expect(error).toBe('O campo não pode estar vazio.');
  });

  it('should return an error if value length is less than min length', () => {
    const minLength = 6;
    const error = Notification.isLessThan('value', minLength);
    expect(error).not.toBeNull();
    expect(error).toBe(
      `O comprimento mínimo é ${minLength} caracteres.`
    );
  });

  it('should return null if value length is more than min length', () => {
    const minLength = 6;
    const error = Notification.isLessThan('value more', minLength);
    expect(error).toBeNull();
  });

  it('should return error if value length is more than max length', () => {
    const maxLength = 6;
    const error = Notification.isMoreThan('value more', maxLength);
    expect(error).not.toBeNull();
    expect(error).toBe(
      `O comprimento máximo é ${maxLength} caracteres.`
    );
  });

  it('should return error with custom error message if value length is more than max length', () => {
    const maxLength = 6;
    const error = Notification.isMoreThan(
      'value more',
      maxLength,
      'custom error message'
    );
    expect(error).not.toBeNull();
    expect(error).toBe('custom error message');
  });

  it('should return null if value length is not more than max length', () => {
    const maxLength = 6;
    const error = Notification.isMoreThan('value', maxLength);
    expect(error).toBeNull();
  });

  it('should return null if email is valid', () => {
    const validEmail = 'test@example.com';
    const error = Notification.isValidEmail(validEmail);
    expect(error).toBeNull();
  });

  it('should return error if email is invalid', () => {
    const invalidEmail = 'invalid.email';
    const error = Notification.isValidEmail(invalidEmail);
    expect(error).not.toBeNull();
    expect(error).toBe('O e-mail fornecido não é válido.');
  });
});
