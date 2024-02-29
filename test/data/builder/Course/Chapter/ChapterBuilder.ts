import { faker } from '@faker-js/faker';
import { ChapterProps } from '@/model/Course/Chapter/types/ChapterProps';
import ChapterNames from './ChapterNames';
import LessonBuilder from '../Lesson/LessonBuilder';

export default class ChapterBuilder {
  private props: ChapterProps = {
    id: 'ba71211c-3da3-4052-ab2c-e4e651168f62',
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

  public build(): ChapterProps {
    return this.props;
  }
}
