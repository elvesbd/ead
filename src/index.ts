import User from '@/model/User';
import Chapter from './model/Course/Chapter';
import { ChapterProps } from './model/Course/Chapter/types/ChapterProps';
import { UserProps } from './model/User/types/UserProps';

export function handler() {
  /*const inputUser: UserProps = {
    firstName: 'Elves',
    lastName: 'Brito',
    email: 'elves@mail.com',
    password: '$2a$08$7iOUCtsgfKJhku7Iwm1dyeEoNzICTzQrg.UPLUShU.A7R4ylXkLc2',
  };

 const user = new User(inputUser);
  console.log(!user.isValid());

  if (!user.isValid()) {
    console.log(user.notifications);

    return user.notifications;
  }

  console.log(user.getProps());

  return user.getProps(); */

  const inputChapter: ChapterProps = {
    name: 'Capitulo 1',
    position: 1,
    lessons: [
      {
        name: 'Tests',
        duration: 1000,
        position: 1,
        urlVideo: 'https://test',
      },
    ],
  };

  const chapter = new Chapter(inputChapter);
  console.log('1', chapter.isValid());

  if (!chapter.isValid()) {
    console.log('if');

    console.log('2', chapter.notifications);

    return chapter.notifications;
  }

  console.log('4', chapter.getProps());

  return chapter.getProps();
}

handler();
