import Validator from '@/utils/Validator';
import { ValueObject } from '../ValueObject';

export default class Email extends ValueObject {
  private readonly value: string;

  constructor(value: string) {
    super();
    this.value = value.trim();

    const validation = new Validator().isEmail(this.value, 'Email');

    this.addNotifications(validation.notifications);
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
