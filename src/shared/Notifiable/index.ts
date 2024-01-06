import Notification from '@/utils/Notification';

export abstract class Notifiable<T extends Notification> {
  private readonly _notifications: T[];

  constructor() {
    this._notifications = [];
  }

  get notifications(): ReadonlyArray<T> {
    return this._notifications;
  }

  get isValidData(): boolean {
    return this._notifications.length === 0;
  }

  /* addNotification(
    key: string,
    message: string,
    ctor: new (key: string, message: string) => T
  ): void {
    const notificationInstance = this.getNotificationInstance(
      key,
      message,
      ctor
    );
    this._notifications.push(notificationInstance);
  } */

  // Na classe Notifiable
  addSingleNotification(notification: T): void {
    this._notifications.push(notification);
  }

  addNotifications(notifications: ReadonlyArray<T>): void {
    this._notifications.push(...notifications);
  }

  private getNotificationInstance(
    key: string,
    message: string,
    ctor: new (key: string, message: string) => T
  ): T {
    return new ctor(key, message);
  }
}
