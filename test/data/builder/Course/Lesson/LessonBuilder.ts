import { faker } from '@faker-js/faker';
import { LessonProps } from '@/model/Course/Lesson/types/LessonProps';
import { randomUUID } from 'crypto';

export default class LessonBuilder {
  private props: LessonProps = {
    //id: 'ba71211c-3da3-4052-ab2c-e4e651168f62',
    name: faker.person.fullName(),
    duration: faker.number.int({ min: 90, max: 3600 }),
    urlVideo: faker.internet.url(),
    position: faker.number.int({ min: 1, max: 100 }),
  };

  public static aLesson(): LessonBuilder {
    return new LessonBuilder();
  }

  public static createLessons(qtd: number): LessonProps[] {
    const lesson = () => LessonBuilder.aLesson().withId().build();
    return Array.from({ length: qtd }).map(() => lesson());
  }

  public withId(): this {
    this.props.id = randomUUID();
    return this;
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

  public withName(name: string): this {
    this.props.name = name;
    return this;
  }

  public withDuration(duration: number): this {
    this.props.duration = duration;
    return this;
  }

  public withPosition(position: number): this {
    this.props.position = position;
    return this;
  }

  public build(): LessonProps {
    return this.props;
  }
}
