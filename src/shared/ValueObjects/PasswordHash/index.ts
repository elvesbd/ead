import Validator from '@/utils/Validator';
import { ValidatorOutput } from '@/utils/Validator/types/Validator';
import { ValueObject } from '../ValueObject';

export default class PasswordHash extends ValueObject {
  private readonly value: string;

  constructor(value: string) {
    super();
    this.value = value;
    const validation = new Validator().matchesRegex(
      this.value,
      /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/,
      'Senha Hash'
    );

    this.addNotifications(validation.notifications);
  }

  get getValue(): string {
    return this.value;
  }
}
