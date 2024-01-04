import Validator from '@/utils/Validator';
import { ValidatorOutput } from '@/utils/Validator/types/Validator';

export default class StrongPassword {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.validate();
  }

  validate(): ValidatorOutput {
    const validation = new Validator();
    validation.matchesRegex(
      this.value,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Senha'
    );

    return validation.getOutput();
  }

  get getValue(): string {
    return this.value;
  }
}
