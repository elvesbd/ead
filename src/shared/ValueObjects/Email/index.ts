import Validator from '@/utils/Validator';
import { ValidatorOutput } from '@/utils/Validator/types/Validator';

export default class Email {
  private readonly value: string;

  constructor(value: string) {
    this.value = value.trim();
  }

  validate(validation: Validator): ValidatorOutput {
    validation.isEmail(this.value, 'Email');
    return validation.getOutput();
  }

  get getValue(): string {
    return this.value;
  }

  get getEmailUser(): string {
    return this.value.split('@')[0];
  }

  get getEmailDomain(): string {
    const domain = this.value.split('@')[1];
    return domain.split('.')[0];
  }
}
