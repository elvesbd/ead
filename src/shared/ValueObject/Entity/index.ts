import Id from '@/shared/ValueObject/Id';
import { EntityProps } from '@/shared/ValueObject/Entity/types/EntityProps';

export default abstract class Entity<
  T extends Entity<T, P>,
  P extends EntityProps
> {
  protected _id: Id;
  readonly props: P;

  constructor(props: P) {
    this._id = new Id(props.id);
    this.props = { ...props, id: this._id.getValue };
  }

  abstract getProps(): P;
  abstract isValid(): boolean;
  abstract get notifications(): Record<string, string[]>;

  isEqual(entity: Entity<T, P>): boolean {
    return this._id.isEqual(entity._id);
  }

  isNotEqual(entity: Entity<T, P>): boolean {
    return this._id.isDifferent(entity._id);
  }

  clone(newProps: Partial<P>, ...args: any[]): T {
    return new (this.constructor as any)(
      {
        ...this.props,
        ...newProps,
      },
      ...args
    );
  }
}
