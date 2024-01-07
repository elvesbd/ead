export class CpfValidator {
  public static isValid(value: string): boolean {
    const digits = CpfValidator.extractDigits(value);
    const firstNineDigits = digits.slice(0, 9);
    const firstCheckDigit = digits[9];

    const lastNineDigits = digits.slice(1, 10);
    const secondCheckDigit = digits[10];

    const isDigitOneValid = CpfValidator.isValidCheckDigit(
      firstNineDigits,
      firstCheckDigit
    );
    const isDigitTwoValid = CpfValidator.isValidCheckDigit(
      lastNineDigits,
      secondCheckDigit
    );

    return isDigitOneValid && isDigitTwoValid;
  }

  private static extractDigits(value: string): string[] {
    const numbers = value.replace(/\D/g, '');
    return numbers.split('');
  }

  private static isValidCheckDigit(digits: string[], digit: string): boolean {
    const factors = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const total = digits.reduce(
      (acc, digit, i) => acc + +digit * factors[i],
      0
    );

    const remainder = total % 11;
    const calculationCheckDigit = remainder < 2 ? 0 : 11 - remainder;

    return calculationCheckDigit === +digit;
  }
}
