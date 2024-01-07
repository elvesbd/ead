import { Notifiable } from '@/utils/core-validator/Notifiable';
import Notification from '@/utils/core-validator/Notification';

class NotifiableSpy extends Notifiable<Notification> {
  public isValidSpy(): boolean {
    return this.isValid();
  }

  public get groupedNotificationsSpy(): Record<string, string[]> {
    return this.groupedNotifications;
  }

  public addNotificationSpy(notification: Notification): void {
    this.addNotification(notification);
  }

  public addNotificationsSpy(notifications: ReadonlyArray<Notification>): void {
    this.addNotifications(notifications);
  }
}

describe('Class - Notifiable', () => {
  let notifiable: NotifiableSpy;

  beforeEach(() => {
    notifiable = new NotifiableSpy();
  });

  describe('isValid()', () => {
    it('should return false when there are notifications', () => {
      notifiable.addNotificationSpy(new Notification('key1', 'message1'));

      const result = notifiable.isValidSpy();

      expect(result).toBeFalsy();
    });

    it('should return true when there are no notifications', () => {
      const result = notifiable.isValidSpy();

      expect(result).toBeTruthy();
    });
  });

  describe('groupedNotifications()', () => {
    it('should group notifications by key', () => {
      notifiable.addNotificationSpy(new Notification('key1', 'message1'));
      notifiable.addNotificationSpy(new Notification('key2', 'message2'));

      const groupedNotifications = notifiable.groupedNotificationsSpy;

      expect(groupedNotifications['key1']).toEqual(['message1']);
      expect(groupedNotifications['key2']).toEqual(['message2']);
    });
  });

  describe('addNotification()', () => {
    it('should add a single notification to the notifications array', () => {
      const notifications = [new Notification('key1', 'message1')];

      notifiable.addNotificationsSpy(notifications);

      expect(notifiable.notifications).toHaveLength(1);
    });
  });

  describe('addNotifications()', () => {
    it('should add multiple notifications to the notifications array', () => {
      const notifications = [
        new Notification('key1', 'message1'),
        new Notification('key2', 'message2'),
      ];

      notifiable.addNotificationsSpy(notifications);

      expect(notifiable.notifications).toHaveLength(notifications.length);
    });
  });
});
