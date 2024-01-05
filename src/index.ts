import User from './model/User';

export function handler() {
  const input = {
    firstName: 'Elves',
    lastName: '',
    email: 'elveas@mail.com',
    password: '$2a$08$7iOUCtsgfKJhku7Iwm1dyeEoNzICTzQrg.UPLUShU.A7R4ylXkLc2',
  };

  //const { validation } = new User(input);
  const user = new User(input);
  console.log('user', user);
  //const { success, notifications } = user.validate();
  // console.log(validation.getNotifications());
  if (user.hasNotifications()) {
    console.log('IF');
    console.log('notifications', user.getNotifications());
    return user.getNotifications();
  }
  console.log('user', user.getUser);
}

handler();
