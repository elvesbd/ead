import Id from '../value-objects/Id';

export type EntityProps = {
  id?: string;
};

export default abstract class Entity<T, P extends EntityProps> {
  readonly id: Id;
  readonly props: P;

  constructor(props: P) {
    this.id = new Id(props.id);
    this.props = { ...props, id: this.id.value };
  }

  isEquals(entity: Entity<T, P>): boolean {
    return this.id.isEquals(entity?.id);
  }

  isDifferent(entity: Entity<T, P>): boolean {
    return this.id.isDifferent(entity?.id);
  }

  clone(props: Partial<P>, ...args: any): T {
    return new (this.constructor as any)(
      {
        ...this.props,
        ...props,
      },
      ...args
    );
  }
}
