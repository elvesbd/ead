import { Output } from './types/output';

export default class Notification {
  private notifications: string[] = [];

  constructor() {
    this.notifications = [];
  }

  public addNotification(message: string): void {
    this.notifications.push(message);
  }

  public clearNotifications(): void {
    this.notifications = [];
  }

  public hasNotifications(): boolean {
    return this.notifications.length > 0;
  }

  public getNotifications(): string[] {
    return this.notifications;
  }

  public getResult(): Output {
    return {
      success: !this.hasNotifications(),
      notifications: this.notifications,
    };
  }
}
