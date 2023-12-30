import ErrorType from '@/constants/ErrorType';
import ErrorValidation from '@/error/ErrorValidation';
import { v4 as uuid, validate } from 'uuid';

export default class Id {
  readonly value: string;

  constructor(value?: string) {
    this.value = value ?? uuid();

    if (!validate(this.value))
      ErrorValidation.throw(ErrorType.INVALID_ID, this.value);
  }

  isEqual(id: Id) {
    return this.value === id.value;
  }

  isDifferent(id: Id) {
    return this.value !== id.value;
  }
}
