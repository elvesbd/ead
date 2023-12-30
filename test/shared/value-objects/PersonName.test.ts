import PersonName from '@/shared/value-objects/PersonName';
import { PersonNameProps } from '@/shared/value-objects/PersonName/types/PersonNameProps';

describe('Value Object - PersonName', () => {
  let personName: PersonName;

  const props: PersonNameProps = {
    firstName: 'Elves',
    lastName: 'Brito',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    personName = new PersonName(props);
  });

  it('should return first name with success', () => {
    expect(personName.getFirstName).toEqual(props.firstName);
  });

  it('should return last name with success', () => {
    expect(personName.getLastName).toBe(props.lastName);
  });

  it('should return initials name', () => {
    expect(personName.getInitials).toBe('EB');
  });
});
