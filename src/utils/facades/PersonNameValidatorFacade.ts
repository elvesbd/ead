import { PersonNameProps } from '@/shared/value-objects/PersonName/types/PersonNameProps';
import Validator from '@/utils/Validator';

export default class PersonNameValidatorFacade {
  static validateProps(props: PersonNameProps) {
    const validator = new Validator();

    validator
      .isRequired(props.firstName, 'Nome')
      .isNotEmpty(props.firstName, 'Nome')
      .isLongerThan(props.firstName, 'Nome', 80)
      .isShorterThan(props.firstName, 'Nome', 3)
      .isString(props.firstName, 'Nome')
      .matchesRegex(props.firstName, /^[a-zA-ZÁ-ú'\-\s]*$/, 'Nome');

    validator
      .isRequired(props.lastName, 'Sobrenome')
      .isNotEmpty(props.lastName, 'Sobrenome')
      .isLongerThan(props.lastName, 'Sobrenome', 80)
      .isShorterThan(props.lastName, 'Sobrenome', 3)
      .isString(props.lastName, 'Sobrenome')
      .matchesRegex(props.lastName, /^[a-zA-ZÁ-ú'\-\s]*$/, 'Sobrenome');

    const validationErrors = validator.build();

    if (validationErrors) {
      throw validationErrors;
    }
  }
}
