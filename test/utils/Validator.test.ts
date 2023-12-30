import { errorMessages } from '@/constants/ErrorMessages';
import Validator from '@/utils/Validator';

describe('Class - Validator', () => {
  let validator: Validator;

  beforeEach(() => {
    jest.clearAllMocks();
    validator = new Validator();
  });

  const props = {
    value: 'value',
    key: 'key',
  };

  describe('build()', () => {
    it('should returns null when there are no validation errors', () => {
      const notifications = validator
        .isRequired(props.value, props.key)
        .isNotEmpty(props.value, props.key)
        .isShorterThan(props.value, props.key, 5)
        .isLongerThan(props.value, props.key, 5)
        .isNumber(1, props.key)
        .isString(props.value, props.key)
        .matchesRegex('12345678910', /^\d+$/, props.key)
        .build();

      expect(notifications).toBeNull();
    });

    it('should returns validation errors when errors are present', () => {
      const notifications = validator
        .isRequired(null, props.key)
        .isNotEmpty('', props.key)
        .isShorterThan(props.value, props.key, 6)
        .isLongerThan(props.value, props.key, 4)
        .isNumber('1', props.key)
        .isString(1, props.key)
        .matchesRegex('@12345678910', /^\d+$/, props.key)
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(7);
    });
  });

  describe('isRequired()', () => {
    it('should returns validation errors when value is null', () => {
      const notifications = validator.isRequired(null, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.required(props.key)
      );
    });

    it('should returns validation errors when value is undefined', () => {
      const notifications = validator.isRequired(undefined, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.required(props.key)
      );
    });

    it('should ensure custom error message is returned', () => {
      const notifications = validator
        .isRequired(null, props.key, 'O valor precisa ser definido!')
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        'O valor precisa ser definido!'
      );
    });

    it('should returns null when there are no validation errors', () => {
      const notifications = validator
        .isRequired(props.value, props.key)
        .build();

      expect(notifications).toBeNull();
    });
  });

  describe('isNotEmpty()', () => {
    it('should returns validation errors when value is empty string', () => {
      const notifications = validator.isNotEmpty('', props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0]?.errorMessage).toBe(
        errorMessages.empty(props.key)
      );
    });

    it('should returns validation errors when value is undefined', () => {
      const notifications = validator.isNotEmpty(undefined, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0]?.errorMessage).toBe(
        errorMessages.empty(props.key)
      );
    });

    it('should returns validation errors when value is null', () => {
      const notifications = validator.isNotEmpty(null, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0]?.errorMessage).toBe(
        errorMessages.empty(props.key)
      );
    });

    it('should returns custom error message is returned', () => {
      const notifications = validator
        .isNotEmpty(null, props.key, 'Não deve ser vazio!')
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0]?.errorMessage).toBe('Não deve ser vazio!');
    });

    it('should returns null when there are no validation errors', () => {
      const notifications = validator
        .isNotEmpty(props.value, props.key)
        .build();

      expect(notifications).toBeNull();
    });
  });

  describe('isShorterThan()', () => {
    let minLength = 0;

    it('should returns minLength error for short string', () => {
      minLength = 6;
      const notifications = validator
        .isShorterThan(props.value, props.key, minLength)
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.minLength(minLength, props.key)
      );
    });

    it('should returns minLength error for short string array', () => {
      minLength = 2;
      const notifications = validator
        .isShorterThan([props.value], props.key, minLength)
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.minLength(2, props.key)
      );
    });

    it('should returns custom error message for short string', () => {
      minLength = 6;
      const notifications = validator
        .isShorterThan(
          props.value,
          props.key,
          minLength,
          'O valor não pode ser menor!'
        )
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        'O valor não pode ser menor!'
      );
    });

    it('should returns null for valid string length', () => {
      minLength = 5;
      const notifications = validator
        .isShorterThan(props.value, props.key, minLength)
        .build();

      expect(notifications).toBeNull();
    });

    it('should returns null for valid string array length', () => {
      minLength = 1;
      const notifications = validator
        .isShorterThan([props.value], props.key, minLength)
        .build();

      expect(notifications).toBeNull();
    });
  });

  describe('isLongerThan()', () => {
    let maxLength = 0;

    it('should returns maxLength error for long string', () => {
      maxLength = 4;
      const notifications = validator
        .isLongerThan(props.value, props.key, maxLength)
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.maxLength(maxLength, props.key)
      );
    });

    it('should returns maxLength error for long string array', () => {
      maxLength = 1;
      const notifications = validator
        .isLongerThan([props.value, props.value], props.key, maxLength)
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.maxLength(maxLength, props.key)
      );
    });

    it('should returns custom error message for long string', () => {
      maxLength = 4;
      const notifications = validator
        .isLongerThan(
          props.value,
          props.key,
          maxLength,
          'O valor não pode ser maior!'
        )
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        'O valor não pode ser maior!'
      );
    });

    it('should returns null for valid string length', () => {
      maxLength = 5;
      const error = validator
        .isLongerThan(props.value, props.key, maxLength)
        .build();

      expect(error).toBeNull();
    });

    it('should returns null for valid string array length', () => {
      maxLength = 1;
      const notifications = validator
        .isLongerThan([props.value], props.key, maxLength)
        .build();

      expect(notifications).toBeNull();
    });
  });

  describe('isNumber()', () => {
    it('should return isNumber error for string', () => {
      const notifications = validator.isNumber('1', props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.number(props.key)
      );
    });

    it('should return isNumber error for boolean', () => {
      const notifications = validator.isNumber(true, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.number(props.key)
      );
    });

    it('should return isNumber error for object', () => {
      const notifications = validator.isNumber({}, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.number(props.key)
      );
    });

    it('should return isNumber error for undefined', () => {
      const notifications = validator.isNumber(undefined, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.number(props.key)
      );
    });

    it('should return isNumber error for null', () => {
      const notifications = validator.isNumber(null, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.number(props.key)
      );
    });

    it('should return isNumber error for NaN', () => {
      const notifications = validator.isNumber(NaN, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.number(props.key)
      );
    });

    it('should returns isNumber error with custom error message if type not number', () => {
      const notifications = validator
        .isNumber(NaN, props.key, 'O valor informado deve ser do tipo number!')
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        'O valor informado deve ser do tipo number!'
      );
    });

    it('should returns null for valid number', () => {
      const notifications = validator.isNumber(1, props.key).build();

      expect(notifications).toBeNull();
    });
  });

  describe('isString()', () => {
    it('should return isString error for number', () => {
      const notifications = validator.isString(1, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.string(props.key)
      );
    });

    it('should return isString error for boolean', () => {
      const notifications = validator.isString(true, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.string(props.key)
      );
    });

    it('should return isString error for object', () => {
      const notifications = validator.isString({}, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.string(props.key)
      );
    });

    it('should return isString error for undefined', () => {
      const notifications = validator.isString(undefined, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.string(props.key)
      );
    });

    it('should return isString error for null', () => {
      const notifications = validator.isString(null, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.string(props.key)
      );
    });

    it('should return isString error for NaN', () => {
      const notifications = validator.isString(NaN, props.key).build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.string(props.key)
      );
    });

    it('should returns isString error with custom error message if type not string', () => {
      const notifications = validator
        .isString(NaN, props.key, 'O valor informado deve ser do tipo string!')
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        'O valor informado deve ser do tipo string!'
      );
    });

    it('should returns null for valid string', () => {
      const notifications = validator.isString(props.value, props.key).build();

      expect(notifications).toBeNull();
    });
  });

  describe('matchesRegex()', () => {
    it('should returns null for valid regex', () => {
      const notifications = validator
        .matchesRegex('12345678900', /^\d+$/, props.key)
        .build();

      expect(notifications).toBeNull();
    });

    it('should returns matchesRegex error for test not valid regex', () => {
      const notifications = validator
        .matchesRegex('@2345678900', /^\d+$/, props.key)
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        errorMessages.regex(props.key)
      );
    });

    it('should returns matchesRegex error with custom error message if test not valid regex', () => {
      const notifications = validator
        .matchesRegex(
          '@2345678900',
          /^\d+$/,
          props.key,
          'O valor não corresponde ao padrão da regex informada!'
        )
        .build();

      expect(notifications).not.toBeNull();
      expect(notifications).toHaveLength(1);
      expect(notifications![0].errorMessage).toBe(
        'O valor não corresponde ao padrão da regex informada!'
      );
    });
  });
});
