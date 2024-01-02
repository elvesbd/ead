import { notificationMessages } from '@/constants/NotificationMessages';
import Notification from '@/utils/Notification';
import Validator from '@/utils/Validator';

describe('Class - Validator', () => {
  let validator: Validator;
  let notification: Notification;

  beforeEach(() => {
    jest.clearAllMocks();
    notification = new Notification();
    validator = new Validator(notification);
  });

  const props = {
    value: 'value',
    key: 'key',
  };

  describe('getResult()', () => {
    it('should returns empty notifications when there are no notifications', () => {
      validator
        .isRequired(props.value, props.key)
        .isNotEmpty(props.value, props.key)
        .isShorterThan(props.value, props.key, 5)
        .isLongerThan(props.value, props.key, 5)
        .isNumber(1, props.key)
        .isString(props.value, props.key)
        .matchesRegex('12345678910', /^\d+$/, props.key);

      const expectedResult = {
        success: true,
        notifications: [],
      };

      expect(notification.getResult()).toStrictEqual(expectedResult);
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

      const expectedResult = {
        success: false,
        notifications: [
          'key é obrigatório!',
          'key não pode ser vazio!',
          'key não pode ter menos que 6 caracteres!',
          'key não pode ter mais que 4 caracteres!',
          'key deve ser um número válido!',
          'key deve ser do tipo string!',
          'key não corresponde ao padrão esperado!',
        ],
      };

      expect(notification.getResult()).toStrictEqual(expectedResult);
    });
  });

  describe('isRequired()', () => {
    it('should returns notification when value is null', () => {
      validator.isRequired(null, props.key);

      const expectedResult = {
        notifications: ['key é obrigatório!'],
      };

      expect(notification.getNotifications()).toStrictEqual(
        expectedResult.notifications
      );
    });

    it('should returns notification when value is undefined', () => {
      validator.isRequired(undefined, props.key);

      const expectedResult = {
        notifications: ['key é obrigatório!'],
      };

      expect(notification.getNotifications()).toStrictEqual(
        expectedResult.notifications
      );
    });

    it('should ensure custom notifications message is returned', () => {
      validator.isRequired(null, props.key, 'O valor precisa ser definido!');

      const expectedResult = {
        notifications: ['O valor precisa ser definido!'],
      };

      expect(notification.getNotifications()).toStrictEqual(
        expectedResult.notifications
      );
    });

    it('should returns empty notification for a valid value', () => {
      validator.isRequired(props.value, props.key);
      expect(notification.getNotifications()).toStrictEqual([]);
    });
  });

  describe('isNotEmpty()', () => {
    it('should returns notifications when value is empty string', () => {
      validator.isNotEmpty('', props.key);

      const expectedResult = {
        notifications: ['key não pode ser vazio!'],
      };

      expect(notification.getNotifications()).toStrictEqual(
        expectedResult.notifications
      );
    });

    it('should returns notifications when value is undefined', () => {
      validator.isNotEmpty(undefined, props.key);

      const expectedResult = {
        notifications: ['key não pode ser vazio!'],
      };

      expect(notification.getNotifications()).toStrictEqual(
        expectedResult.notifications
      );
    });

    it('should returns notifications when value is null', () => {
      validator.isNotEmpty(null, props.key);

      const expectedResult = {
        notifications: ['key não pode ser vazio!'],
      };

      expect(notification.getNotifications()).toStrictEqual(
        expectedResult.notifications
      );
    });

    it('should returns custom notification message is returned', () => {
      validator.isNotEmpty(null, props.key, 'Não deve ser vazio!');

      const expectedResult = {
        notifications: ['Não deve ser vazio!'],
      };

      expect(notification.getNotifications()).toStrictEqual(
        expectedResult.notifications
      );
    });

    it('should returns empty notification for a valid value', () => {
      validator.isNotEmpty(props.value, props.key);
      expect(notification.getNotifications()).toStrictEqual([]);
    });
  });

  describe('isShorterThan()', () => {
    let minLength = 0;

    it('should returns minLength notification for short string', () => {
      minLength = 6;
      validator.isShorterThan(props.value, props.key, minLength);

      const expectedResult = {
        notifications: ['key não pode ter menos que 6 caracteres!'],
      };

      expect(notification.getNotifications()).toStrictEqual(
        expectedResult.notifications
      );
    });

    it('should returns minLength notification for short string array', () => {
      minLength = 2;
      validator.isShorterThan([props.value], props.key, minLength);

      const expectedResult = {
        notifications: ['key não pode ter menos que 2 caracteres!'],
      };

      expect(notification.getNotifications()).toStrictEqual(
        expectedResult.notifications
      );
    });

    it('should returns custom notification message for short string', () => {
      minLength = 6;
      validator.isShorterThan(
        props.value,
        props.key,
        minLength,
        'O valor não pode ser menor!'
      );

      const expectedResult = {
        notifications: ['O valor não pode ser menor!'],
      };

      expect(notification.getNotifications()).toStrictEqual(
        expectedResult.notifications
      );
    });

    it('should returns empty notification for valid string length', () => {
      minLength = 5;
      validator.isShorterThan(props.value, props.key, minLength);

      expect(notification.getNotifications()).toStrictEqual([]);
    });

    it('should returns empty notification for valid string array length', () => {
      minLength = 1;
      validator.isShorterThan([props.value], props.key, minLength);

      expect(notification.getNotifications()).toStrictEqual([]);
    });
  });

  describe('isLongerThan()', () => {
    let maxLength = 0;

    it('should returns maxLength notification for long string', () => {
      maxLength = 4;
      validator.isLongerThan(props.value, props.key, maxLength);

      const message = notificationMessages.maxLength(maxLength, props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should returns maxLength notification for long string array', () => {
      maxLength = 1;
      validator.isLongerThan([props.value, props.value], props.key, maxLength);

      const message = notificationMessages.maxLength(maxLength, props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should returns custom notification message for long string', () => {
      maxLength = 4;
      validator.isLongerThan(
        props.value,
        props.key,
        maxLength,
        'O valor não pode ser maior!'
      );

      expect(notification.getNotifications()).toStrictEqual([
        'O valor não pode ser maior!',
      ]);
    });

    it('should returns empty notification for valid string length', () => {
      maxLength = 5;
      validator.isLongerThan(props.value, props.key, maxLength);

      expect(notification.getNotifications()).toStrictEqual([]);
    });

    it('should returns empty notification for valid string array length', () => {
      maxLength = 1;
      validator.isLongerThan([props.value], props.key, maxLength);

      expect(notification.getNotifications()).toStrictEqual([]);
    });
  });

  describe('isNumber()', () => {
    it('should return isNumber notification for string value', () => {
      validator.isNumber('1', props.key);

      const message = notificationMessages.number(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should return isNumber notification for boolean value', () => {
      validator.isNumber(true, props.key);

      const message = notificationMessages.number(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should return isNumber notification for object value', () => {
      validator.isNumber({}, props.key);

      const message = notificationMessages.number(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should return isNumber notification for undefined value', () => {
      validator.isNumber(undefined, props.key);

      const message = notificationMessages.number(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should return isNumber notification for null value', () => {
      validator.isNumber(null, props.key);

      const message = notificationMessages.number(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should return isNumber notification for NaN value', () => {
      validator.isNumber(NaN, props.key);

      const message = notificationMessages.number(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should returns isNumber notification with custom error message if type NaN', () => {
      validator.isNumber(
        NaN,
        props.key,
        'O valor informado deve ser do tipo number!'
      );

      expect(notification.getNotifications()).toStrictEqual([
        'O valor informado deve ser do tipo number!',
      ]);
    });

    it('should returns empty notifications for valid number', () => {
      validator.isNumber(1, props.key);

      expect(notification.getNotifications()).toStrictEqual([]);
    });
  });

  describe('isString()', () => {
    it('should return isString notification for number', () => {
      validator.isString(1, props.key);

      const message = notificationMessages.string(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should return isString notification for boolean', () => {
      validator.isString(true, props.key);

      const message = notificationMessages.string(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should return isString notification for object', () => {
      validator.isString({}, props.key);

      const message = notificationMessages.string(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should return isString notification for undefined', () => {
      validator.isString(undefined, props.key);

      const message = notificationMessages.string(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should return isString notification for null', () => {
      validator.isString(null, props.key);

      const message = notificationMessages.string(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should return isString notification for NaN', () => {
      validator.isString(NaN, props.key);

      const message = notificationMessages.string(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should returns isString notification with custom notification message if type not string', () => {
      validator.isString(
        NaN,
        props.key,
        'O valor informado deve ser do tipo string!'
      );

      expect(notification.getNotifications()).toStrictEqual([
        'O valor informado deve ser do tipo string!',
      ]);
    });

    it('should returns empty notification for valid string value', () => {
      validator.isString(props.value, props.key);

      expect(notification.getNotifications()).toStrictEqual([]);
    });
  });

  describe('matchesRegex()', () => {
    it('should returns matchesRegex notification for test not valid regex', () => {
      validator.matchesRegex('@2345678900', /^\d+$/, props.key);

      const message = notificationMessages.regex(props.key);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });

    it('should returns matchesRegex notification with notification error message if test not valid regex', () => {
      validator.matchesRegex(
        '@2345678900',
        /^\d+$/,
        props.key,
        'O valor não corresponde ao padrão da regex informada!'
      );

      expect(notification.getNotifications()).toStrictEqual([
        'O valor não corresponde ao padrão da regex informada!',
      ]);
    });

    it('should returns empty notification for valid regex value', () => {
      validator.matchesRegex('12345678900', /^\d+$/, props.key);
      expect(notification.getNotifications()).toStrictEqual([]);
    });
  });
});
