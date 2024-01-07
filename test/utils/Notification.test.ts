import Notification from '@/utils/core-validator/Notification';

describe('Class - Notification', () => {
  let notification: Notification;

  const props = {
    key: 'key',
    message: 'message',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    notification = new Notification(props.key, props.message);
  });

  describe('Creation()', () => {
    it('should create a notification message', () => {
      expect(notification).toBeInstanceOf(Notification);
    });
  });

  describe('Getters()', () => {
    it('should return notification message key', () => {
      expect(notification.key).toBe(props.key);
    });

    it('should return notification message', () => {
      expect(notification.message).toBe(props.message);
    });
  });

  describe('Setters()', () => {
    it('should set new notification message key', () => {
      notification.key = 'new Key';
      expect(notification.key).toBe('new key');
    });

    it('should set new notification message', () => {
      notification.message = 'new message';
      expect(notification.message).toBe('new message');
    });
  });
});
