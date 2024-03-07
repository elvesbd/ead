import { faker } from '@faker-js/faker';
import { ChapterProps } from '@/model/Course/Chapter/types/ChapterProps';
import ChapterNames from './ChapterNames';
import LessonBuilder from '../Lesson/LessonBuilder';
import { LessonProps } from '@/model/Course/Lesson/types/LessonProps';

export default class ChapterBuilder {
  private props: ChapterProps = {
    name: ChapterNames.get(),
    lessons: LessonBuilder.createLessons(10),
    position: faker.number.int({ min: 1, max: 100 }),
  };

  public static aChapter(): ChapterBuilder {
    return new ChapterBuilder();
  }

  public withoutId(): this {
    this.props.id = undefined;
    return this;
  }

  public withInvalidName(): this {
    this.props.name = '';
    return this;
  }

  public withoutLessons(): this {
    this.props.lessons = [];
    return this;
  }

  public withInvalidPosition(): this {
    this.props.position = 0;
    return this;
  }

  public withLessons(lessons: LessonProps[]): this {
    this.props.lessons = lessons;
    return this;
  }

  public build(): ChapterProps {
    return this.props;
  }
}
