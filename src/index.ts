/* import User from '@/model/User';

export function handler() {
  const input = {
    firstName: 'Elves',
    lastName: 'Brito',
    email: 'elves@mail.com',
    password: '$2a$08$7iOUCtsgfKJhku7Iwm1dyeEoNzICTzQrg.UPLUShU.A7R4ylXkLc2',
  };

  const user = new User(input);
  console.log(!user.isValid());

  if (!user.isValid()) {
    console.log(user.getNotifications());

    return user.getNotifications();
  }

  console.log(user.getUserProps());

  return user.getUserProps();
}

handler();
 */
