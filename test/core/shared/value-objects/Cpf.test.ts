import Cpf from '@/core/shared/value-objects/Cpf';

describe('Value Object - Cpf', () => {
  it('should return false if cpf is empty', () => {
    const execute = () => new Cpf('');
    expect(execute).toThrow(new Error('Invalid CPF!'));
  });

  it('should return false if cpf is less than 11 digits', () => {
    const execute = () => new Cpf('883.776.678-0');
    expect(execute).toThrow(new Error('Invalid CPF!'));
  });

  it('should return false if check digit is invalid', () => {
    const execute = () => new Cpf('883.776.678-00');
    expect(execute).toThrow(new Error('Invalid CPF!'));
  });

  it('should return true if check digit is valid', () => {
    const execute = () => new Cpf('280.012.389-38');
    expect(execute).toBeTruthy();
  });

  it('should return formatted cpf', () => {
    const cpf = new Cpf('28001238938');
    expect(cpf.format).toBe('280.012.389-38');
  });
});
