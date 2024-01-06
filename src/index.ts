import User from './model/User';

interface GroupedNotifications {
  [key: string]: string[];
}

export function handler() {
  const input = {
    firstName: '',
    lastName: '',
    email: 'elveas@mail.com',
    password: '$2a$08$7iOUCtsgfKJhku7Iwm1dyeEoNzICTzQrg.UPLUShU.A7R4ylXkLc2',
  };

  //const { validation } = new User(input);
  const user = new User(input);
  console.log('user', user);
  if (!user.isValid()) {
    console.log('user.isValid()', user.isValid());
    console.log('user.getNotifications()', user.getNotifications());
    const notifications = user.getNotifications();
    // Agrupando as notificações pelo _key
    const groupedNotifications = notifications.reduce(
      (acc: GroupedNotifications, notification) => {
        if (!acc[notification.key]) {
          acc[notification.key] = [];
        }
        acc[notification.key].push(notification.message);
        return acc;
      },
      {}
    );

    console.log('groupedNotifications', groupedNotifications);
    return groupedNotifications;
  }
  console.log('passou', user);
}

handler();
