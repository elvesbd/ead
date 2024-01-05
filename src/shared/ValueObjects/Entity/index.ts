import Id from '../Id';
import { EntityProps } from './types/EntityProps';

export default abstract class Entity<T, Props extends EntityProps> {
  readonly id: Id;

  constructor(input: Props) {
    this.id = new Id(input.id);
  }

  isEqual(entity: Entity<T, Props>): boolean {
    return this.id.isEqual(entity.id);
  }

  isDifferent(entity: Entity<T, Props>): boolean {
    return this.id.isDifferent(entity.id);
  }
}
