import Id from '@/shared/ValueObject/Id';
import Entity from '@/shared/ValueObject/Entity';
import { EntityProps } from '@/shared/ValueObject/Entity/types/EntityProps';

interface EntitySPYProps extends EntityProps {
  name: string;
  age: number;
}

class EntitySPY extends Entity<EntitySPY, EntitySPYProps> {
  getProps(): EntitySPYProps {
    return {
      id: this._id.getValue,
      name: 'Elves',
      age: 40,
    };
  }

  isValid(): boolean {
    return true;
  }

  get notifications(): Record<string, string[]> {
    return {};
  }
}

describe('Value Object - Entity', () => {
  let entity: EntitySPY;

  const props = {
    name: 'Elves',
    age: 40,
  };

  beforeEach(() => {
    entity = new EntitySPY({
      id: new Id('4b9c7f6f-ae18-42a8-beb7-9112236e01d1').getValue,
      ...props,
    });
  });

  describe('getUserProps()', () => {
    it('should return correct user props', () => {
      const userProps = entity.getProps();
      expect(userProps.id).toBe('4b9c7f6f-ae18-42a8-beb7-9112236e01d1');
      expect(userProps.name).toBe('Elves');
      expect(userProps.age).toBe(40);
    });
  });

  describe('isValid()', () => {
    it('should return true for isValid', () => {
      const result = entity.isValid();
      expect(result).toBeTruthy();
    });
  });

  describe('getNotifications()', () => {
    it('should return empty notifications', () => {
      const notifications = entity.notifications;
      expect(Object.keys(notifications)).toHaveLength(0);
    });
  });
});
