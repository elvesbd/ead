/* import PersonName from './shared/value-objects/PersonName';

export function handler() {
  const input = {
    firstName: 'Elves',
    lastName: 'Brito',
  };

  const personName = new PersonName(input);
  const { success, notifications } = personName.validate();
  if (!success) {
    console.log('notifications', notifications);
    return notifications;
  }
  console.log('personName', personName);
}

handler();
 */
