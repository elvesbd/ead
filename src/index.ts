/* import PersonName from './shared/value-objects/PersonName';

export function handler() {
  const input = {
    firstName: 'Elves',
    lastName: 'Brito',
  };

  const { success, notifications } = PersonName.validate(input);
  if (!success) {
    return notifications;
  }

  const personName = new PersonName(input);
  console.log('Validação passou:', personName);
}

handler();
 */
