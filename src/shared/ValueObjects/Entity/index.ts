import Id from '../Id';
import Notification from '@/utils/Notification';
import { Notifiable } from '@/shared/Notifiable';
import { EntityProps } from './types/EntityProps';

export default abstract class Entity<
  T extends Entity<T, P>,
  P extends EntityProps
> extends Notifiable<Notification> {
  protected readonly id: Id;

  constructor(props: P) {
    super();
    this.id = new Id(props.id);
  }

  abstract get getValue(): P;

  isValid(): boolean {
    return this.isValidData;
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }
}
