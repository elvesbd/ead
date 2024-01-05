import { NotificationOutput, Notifications } from './types/Notification';

export default class Notification {
  private notifications: string[] = [];

  public addNotification(message: string): void {
    this.notifications.push(message);
    console.log('notifications', this.notifications);
  }

  public clearNotifications(): void {
    this.notifications = [];
  }

  public hasNotifications(): boolean {
    return this.notifications.length > 0;
  }

  public getNotifications(): Notifications {
    return this.notifications;
  }

  public getNotificationsOutput(): NotificationOutput {
    return {
      success: !this.hasNotifications(),
      notifications: this.notifications,
    };
  }
}
