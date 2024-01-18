import Validator from '@/utils/core-validator/Validator';
import Notification from '@/utils/core-validator/Notification';
import { notificationMessages } from '@/utils/core-validator/messages/NotificationMessages';

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

  const generateNotification = (
    key: string,
    message: string
  ): ReadonlyArray<Notification> => {
    return [new Notification(key, message)];
  };

  describe('notifications', () => {
    it('should returns empty notifications when there are no notifications', () => {
      validator
        .isRequired(props.value, props.key)
        .isNotEmpty(props.value, props.key)
        .isShorterThan(props.value, props.key, 5)
        .isLongerThan(props.value, props.key, 5)
        .isNumber(1, props.key)
        .isString(props.value, props.key)
        .matchesRegex('12345678910', /^\d+$/, props.key);

      expect(validator.notifications).toStrictEqual([]);
    });

    it('should returns notifications when notifications are present', () => {
      validator
        .isRequired(null, props.key)
        .isNotEmpty('', props.key)
        .isShorterThan(props.value, props.key, 6)
        .isLongerThan(props.value, props.key, 4)
        .isNumber('1', props.key)
        .isString(1, props.key)
        .matchesRegex('@12345678910', /^\d+$/, props.key);

      const expectedNotifications = [
        'key é obrigatório!',
        'key não pode ser vazio!',
        'key não pode ter menos que 6 caracteres!',
        'key não pode ter mais que 4 caracteres!',
        'key deve ser um número válido!',
        'key deve ser do tipo string!',
        'key não corresponde ao padrão esperado!',
      ];

      const actualNotifications = validator.notifications.map(
        (notification) => notification.message
      );

      expect(actualNotifications).toStrictEqual(expectedNotifications);
    });
  });

  describe('isRequired()', () => {
    it('should returns notification when value is null', () => {
      validator.isRequired(null, props.key);

      const message = notificationMessages.required(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification when value is undefined', () => {
      validator.isRequired(undefined, props.key);

      const message = notificationMessages.required(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should ensure custom notifications message is returned', () => {
      const message = 'O valor precisa ser definido!';

      validator.isRequired(null, props.key, message);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns empty notification for a valid value', () => {
      validator.isRequired(props.value, props.key);
      expect(validator.notifications).toStrictEqual([]);
    });
  });

  describe('isNotEmpty()', () => {
    it('should returns notifications when value is empty string', () => {
      validator.isNotEmpty('', props.key);

      const message = notificationMessages.empty(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notifications when value is undefined', () => {
      validator.isNotEmpty(undefined, props.key);

      const message = notificationMessages.empty(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notifications when value is null', () => {
      validator.isNotEmpty(null, props.key);

      const message = notificationMessages.empty(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns custom notification message is returned', () => {
      const message = 'Não deve ser vazio!';

      validator.isNotEmpty(null, props.key, 'Não deve ser vazio!');
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns empty notification for a valid value', () => {
      validator.isNotEmpty(props.value, props.key);
      expect(validator.notifications).toStrictEqual([]);
    });
  });

  describe('isShorterThan()', () => {
    let minLength = 0;

    it('should returns notification for short string', () => {
      minLength = 6;
      validator.isShorterThan(props.value, props.key, minLength);

      const message = notificationMessages.minLength(minLength, props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification for short string array', () => {
      minLength = 2;
      validator.isShorterThan([props.value], props.key, minLength);

      const message = notificationMessages.minLength(minLength, props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns custom notification message for short string', () => {
      const message = 'O valor não pode ser menor!';
      minLength = 6;

      validator.isShorterThan(props.value, props.key, minLength, message);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns empty notification for valid string length', () => {
      minLength = 5;

      validator.isShorterThan(props.value, props.key, minLength);

      expect(validator.notifications).toStrictEqual([]);
    });

    it('should returns empty notification for valid string array length', () => {
      minLength = 1;

      validator.isShorterThan([props.value], props.key, minLength);

      expect(validator.notifications).toStrictEqual([]);
    });
  });

  describe('isLongerThan()', () => {
    let maxLength = 0;

    it('should returns notification for long string', () => {
      maxLength = 4;
      validator.isLongerThan(props.value, props.key, maxLength);

      const message = notificationMessages.maxLength(maxLength, props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification for long string array', () => {
      maxLength = 1;
      validator.isLongerThan([props.value, props.value], props.key, maxLength);

      const message = notificationMessages.maxLength(maxLength, props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns custom notification message for long string', () => {
      const message = 'O valor não pode ser maior!';
      maxLength = 4;

      validator.isLongerThan(props.value, props.key, maxLength, message);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns empty notification for valid string length', () => {
      maxLength = 5;

      validator.isLongerThan(props.value, props.key, maxLength);

      expect(validator.notifications).toStrictEqual([]);
    });

    it('should returns empty notification for valid string array length', () => {
      maxLength = 1;

      validator.isLongerThan([props.value], props.key, maxLength);

      expect(validator.notifications).toStrictEqual([]);
    });
  });

  describe('isNumber()', () => {
    it('should return notification for string value', () => {
      validator.isNumber('1', props.key);

      const message = notificationMessages.number(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for boolean value', () => {
      validator.isNumber(true, props.key);

      const message = notificationMessages.number(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for object value', () => {
      validator.isNumber({}, props.key);

      const message = notificationMessages.number(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for undefined value', () => {
      validator.isNumber(undefined, props.key);

      const message = notificationMessages.number(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for null value', () => {
      validator.isNumber(null, props.key);

      const message = notificationMessages.number(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for NaN value', () => {
      validator.isNumber(NaN, props.key);

      const message = notificationMessages.number(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification with custom error message if type NaN', () => {
      const message = 'O valor informado deve ser do tipo number!';

      validator.isNumber(NaN, props.key, message);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns empty notifications for valid number', () => {
      validator.isNumber(1, props.key);
      expect(validator.notifications).toStrictEqual([]);
    });
  });

  describe('isString()', () => {
    it('should return notification for number', () => {
      validator.isString(1, props.key);

      const message = notificationMessages.string(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for boolean', () => {
      validator.isString(true, props.key);

      const message = notificationMessages.string(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for object', () => {
      validator.isString({}, props.key);

      const message = notificationMessages.string(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for undefined', () => {
      validator.isString(undefined, props.key);

      const message = notificationMessages.string(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for null', () => {
      validator.isString(null, props.key);

      const message = notificationMessages.string(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for NaN', () => {
      validator.isString(NaN, props.key);

      const message = notificationMessages.string(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification with custom notification message if type not string', () => {
      const message = 'O valor informado deve ser do tipo string!';

      validator.isString(NaN, props.key, message);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns empty notification for valid string value', () => {
      validator.isString(props.value, props.key);
      expect(validator.notifications).toStrictEqual([]);
    });
  });

  describe('matchesRegex()', () => {
    it('should returns notification for test not valid regex', () => {
      validator.matchesRegex('@2345678900', /^\d+$/, props.key);

      const message = notificationMessages.regex(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification with notification error message if test not valid regex', () => {
      const message = 'O valor não corresponde ao padrão da regex informada!';

      validator.matchesRegex('@2345678900', /^\d+$/, props.key, message);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns empty notification for valid regex value', () => {
      validator.matchesRegex('12345678900', /^\d+$/, props.key);
      expect(validator.notifications).toStrictEqual([]);
    });
  });

  describe('isEmail()', () => {
    it('should returns notification for value not valid', () => {
      validator.isEmail(props.value, props.key);

      const message = notificationMessages.email(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification with custom notification message', () => {
      const message = 'deve ser um e-mail válido';

      validator.isEmail(props.value, props.key, message);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns empty notification for valid value', () => {
      validator.isEmail('elves@mail.com', 'Email');
      expect(validator.notifications).toStrictEqual([]);
    });
  });

  describe('isUUID()', () => {
    it('should returns notification when value is null', () => {
      validator.isUUID(null, props.key);

      const message = notificationMessages.uuid(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification when value is undefined', () => {
      validator.isUUID(undefined, props.key);

      const message = notificationMessages.uuid(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification when value is boolean', () => {
      validator.isUUID(true, props.key);

      const message = notificationMessages.uuid(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification when value is object', () => {
      validator.isUUID({}, props.key);

      const message = notificationMessages.uuid(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification when value is NaN', () => {
      validator.isUUID(NaN, props.key);

      const message = notificationMessages.uuid(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification with custom notification message', () => {
      const value = 'dfce3e638c774cf390b80a63996ef10d';
      const message = 'uuid deve ser válido!';

      validator.isUUID(value, props.key, message);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns empty notification for valid value', () => {
      const value = 'dfce3e63-8c77-4cf3-90b8-0a63996ef10d';
      validator.isUUID(value, props.key);
      expect(validator.notifications).toStrictEqual([]);
    });
  });

  describe('isCPF()', () => {
    it('should return notification for boolean value', () => {
      validator.isCPF(true, props.key);

      const message = notificationMessages.cpf(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for object value', () => {
      validator.isCPF({}, props.key);

      const message = notificationMessages.cpf(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for undefined value', () => {
      validator.isCPF(undefined, props.key);

      const message = notificationMessages.cpf(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for null value', () => {
      validator.isCPF(null, props.key);

      const message = notificationMessages.cpf(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for NaN value', () => {
      validator.isCPF(NaN, props.key);

      const message = notificationMessages.cpf(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification with custom error message if invalid value', () => {
      const message = 'O valor informado deve ser um cpf válido!';

      validator.isCPF(NaN, props.key, message);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for invalid cpf', () => {
      validator.isCPF('123.456.789-00', props.key);

      const message = notificationMessages.cpf(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return empty notifications for valid CPF with formatted input', () => {
      validator.isCPF('406.371.700-32', props.key);
      expect(validator.notifications).toStrictEqual([]);
    });

    it('should return empty notifications for valid CPF with unformatted input', () => {
      validator.isCPF('40637170032', props.key);
      expect(validator.notifications).toStrictEqual([]);
    });
  });

  describe('isNegative()', () => {
    it('should return notification for negative number', () => {
      const value = -1;
      validator.isNegative(value, props.key);

      const message = notificationMessages.negative(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for boolean', () => {
      validator.isNegative(true, props.key);

      const message = notificationMessages.negative(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for object', () => {
      validator.isNegative({}, props.key);

      const message = notificationMessages.negative(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for undefined', () => {
      validator.isNegative(undefined, props.key);

      const message = notificationMessages.negative(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for null', () => {
      validator.isNegative(null, props.key);

      const message = notificationMessages.negative(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should return notification for NaN', () => {
      validator.isNegative(NaN, props.key);

      const message = notificationMessages.negative(props.key);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns notification with custom notification message if type not string', () => {
      const message = 'O valor informado deve ser do tipo string!';

      validator.isNegative(NaN, props.key, message);
      const notification = generateNotification(props.key, message);

      expect(validator.notifications).toStrictEqual(notification);
    });

    it('should returns empty notification for valid string value', () => {
      const value = 1;
      validator.isNegative(value, props.key);
      expect(validator.notifications).toStrictEqual([]);
    });
  });

});
