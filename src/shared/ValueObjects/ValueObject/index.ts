import { Notifiable } from '@/shared/Notifiable';
import Notification from '@/utils/Notification';

export abstract class ValueObject extends Notifiable<Notification> {
  isValid(): boolean {
    return this.isValidData;
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }
}
