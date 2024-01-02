import Validator from '@/utils/Validator';
import { PersonNameInput } from '../types/PersonNameInput';

export default class PersonNameValidator {
  constructor(private readonly validator: Validator) {}

  public validateProps(props: PersonNameInput): void {
    this.validator
      .isRequired(props.firstName, 'Nome')
      .isNotEmpty(props.firstName, 'Nome')
      .isLongerThan(props.firstName, 'Nome', 80)
      .isShorterThan(props.firstName, 'Nome', 3)
      .isString(props.firstName, 'Nome')
      .matchesRegex(props.firstName, /^[a-zA-ZÁ-ú'\-\s]*$/, 'Nome');

    this.validator
      .isRequired(props.lastName, 'Sobrenome')
      .isNotEmpty(props.lastName, 'Sobrenome')
      .isLongerThan(props.lastName, 'Sobrenome', 80)
      .isShorterThan(props.lastName, 'Sobrenome', 3)
      .isString(props.lastName, 'Sobrenome')
      .matchesRegex(props.lastName, /^[a-zA-ZÁ-ú'\-\s]*$/, 'Sobrenome');
  }
}
