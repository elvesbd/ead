import Id from '../Id';
import { EntityInput } from './types/EntityInput';

export default abstract class Entity<T, Props extends EntityInput> {
  readonly id: Id;
  readonly props: Props;

  constructor(input: Props) {
    this.id = new Id(input.id);
    this.props = { ...input, id: this.id.value };
  }

  isEqual(entity: Entity<T, Props>): boolean {
    return this.id.isEqual(entity.id);
  }

  isDifferent(entity: Entity<T, Props>): boolean {
    return this.id.isDifferent(entity.id);
  }

  clone(newProps: Props, ...args: any[]): T {
    return new (this.constructor as any)(
      {
        ...this.props,
        ...newProps,
      },
      ...args
    );
  }
}
