export default class Cpf {
  readonly value: string;

  constructor(value: string) {
    this.value = value;

    if (!this.isValid()) throw new Error('Invalid CPF!');
  }

  get format() {
    return this.value.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    );
  }

  private isValid(): boolean {
    if (!this.isValidCpfFormat()) {
      return false;
    }

    const digits = this.extractDigits();
    const firstNineDigits = digits.slice(0, 9);
    const firstCheckDigit = digits[9];

    const lastNineDigits = digits.slice(1, 10);
    const secondCheckDigit = digits[10];

    const isDigitOneValid = Cpf.isValidCheckDigit(
      firstNineDigits,
      firstCheckDigit
    );
    const isDigitTwoValid = Cpf.isValidCheckDigit(
      lastNineDigits,
      secondCheckDigit
    );

    return isDigitOneValid && isDigitTwoValid;
  }

  private isValidCpfFormat(): boolean {
    if (!this.value) {
      return false;
    }

    const numbers = this.value.replace(/\D/g, '');
    return numbers.length === 11;
  }

  private extractDigits(): string[] {
    const numbers = this.value.replace(/\D/g, '');
    return numbers.split('');
  }

  private static isValidCheckDigit(
    digits: string[],
    digit: string
  ): boolean {
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
