import Notification from '@/utils/Notification';
import { notificationMessages } from '@/constants/NotificationMessages';

describe('Class - Notification', () => {
  let notification: Notification;

  beforeEach(() => {
    jest.clearAllMocks();
    notification = new Notification();
  });

  const props = {
    value: 'value',
    key: 'key',
  };

  describe('addNotification()', () => {
    it('should add a notification message', () => {
      const message = notificationMessages.required(props.key);

      notification.addNotification(message);

      expect(notification.getNotifications()).toStrictEqual([message]);
    });
  });

  describe('hasNotifications()', () => {
    it('should has a empty notification message', () => {
      notification.hasNotifications();

      expect(notification.getNotifications()).toStrictEqual([]);
    });

    it('should has a notification message', () => {
      const message = notificationMessages.required(props.key);

      notification.addNotification(message);
      notification.hasNotifications();

      expect(notification.getNotifications()).toStrictEqual([message]);
    });
  });

  describe('clearNotifications()', () => {
    it('should clear a notification message', () => {
      const message = notificationMessages.required(props.key);

      notification.addNotification(message);
      notification.clearNotifications();

      expect(notification.getNotifications()).toStrictEqual([]);
    });
  });

  describe('validate()', () => {
    it('should return success when no notifications', () => {
      const expectedResult = {
        success: true,
        notifications: [],
      };

      expect(notification.getNotificationsOutput()).toStrictEqual(
        expectedResult
      );
    });

    it('should return failure when has notifications', () => {
      const message = notificationMessages.required(props.key);

      notification.addNotification(message);
      const expectedResult = {
        success: false,
        notifications: [message],
      };

      expect(notification.getNotificationsOutput()).toStrictEqual(
        expectedResult
      );
    });
  });
});
