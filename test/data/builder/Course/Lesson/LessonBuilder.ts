import { faker } from '@faker-js/faker';
import { LessonProps } from '@/model/Course/Lesson/types/LessonProps';

export default class LessonBuilder {
  private props: LessonProps = {
    id: 'ba71211c-3da3-4052-ab2c-e4e651168f62',
    name: faker.person.fullName(),
    duration: faker.number.int({ min: 90, max: 3600 }),
    urlVideo: faker.internet.url(),
    position: faker.number.int({ min: 1, max: 100 }),
  };

  public static aLesson(): LessonBuilder {
    return new LessonBuilder();
  }

  public withoutId(): this {
    this.props.id = undefined;
    return this;
  }

  public withInvalidName(): this {
    this.props.name = '';
    return this;
  }

  public withInvalidDuration(): this {
    this.props.duration = 0;
    return this;
  }

  public withInvalidUrl(): this {
    this.props.urlVideo = 'www.test.com';
    return this;
  }

  public withInvalidPosition(): this {
    this.props.position = 0;
    return this;
  }

  public build(): LessonProps {
    return this.props;
  }
}
