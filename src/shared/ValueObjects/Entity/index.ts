import Id from '../Id';
import { EntityProps } from './types/EntityProps';

export default abstract class Entity<
  T extends Entity<T, P>,
  P extends EntityProps
> {
  protected _id: Id;

  constructor(props: P) {
    this._id = new Id(props.id);
  }

  abstract getUserProps(): P;
  abstract isValid(): boolean;
  abstract getNotifications(): Record<string, string[]>;
}
