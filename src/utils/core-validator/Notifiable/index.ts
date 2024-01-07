import Notification from '@/utils/core-validator/Notification';

export abstract class Notifiable<T extends Notification> {
  private _notifications: T[];

  constructor() {
    this._notifications = [];
  }

  get notifications(): ReadonlyArray<T> {
    return this._notifications;
  }

  public isValid(): boolean {
    return this._notifications.length === 0;
  }

  protected get groupedNotifications(): Record<string, string[]> {
    const groupedNotifications: Record<string, string[]> = {};

    for (const notification of this.notifications) {
      const { key, message } = notification;

      if (!groupedNotifications[key]) {
        groupedNotifications[key] = [];
      }

      groupedNotifications[key].push(message);
    }

    return groupedNotifications;
  }

  protected addNotification(notification: T): void {
    this._notifications.push(notification);
  }

  protected addNotifications(notifications: ReadonlyArray<T>): void {
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
