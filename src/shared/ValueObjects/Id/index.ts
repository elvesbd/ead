import { v4 as uuid, validate } from 'uuid';

export default class Id {
  readonly value: string;

  constructor(value?: string) {
    this.value = value ?? uuid();

    if (!validate(this.value)) throw new Error('Invalid Id');
  }

  isEqual(id: Id) {
    return this.value === id.value;
  }

  isDifferent(id: Id) {
    return this.value !== id.value;
  }
}
