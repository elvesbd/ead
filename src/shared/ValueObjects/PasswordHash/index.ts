import Validator from '@/utils/Validator';
import { ValidatorOutput } from '@/utils/Validator/types/Validator';

export default class PasswordHash {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  validate(validation: Validator): ValidatorOutput {
    validation.matchesRegex(
      this.value,
      /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/,
      'Senha Hash'
    );

    return validation.getOutput();
  }

  get getValue(): string {
    return this.value;
  }
}
