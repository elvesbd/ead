import Entity from '@/shared/ValueObject/Entity';
import { ChapterProps } from './types/ChapterProps';
import Position from '@/shared/ValueObject/Position';
import Name from '@/shared/ValueObject/Name';
import Lesson from '../Lesson';
import Duration from '@/shared/ValueObject/Duration';
import { LessonProps } from '../Lesson/types/LessonProps';
import Id from '@/shared/ValueObject/Id';

export default class Chapter extends Entity<Chapter, ChapterProps> {
  private _name: Name;
  private _position: Position;
  private _lessons: Lesson[];

  constructor(props: ChapterProps) {
    const orderedLessons = Chapter.orderLessons(props.lessons);

    super({
      ...props,
      lessons: orderedLessons,
    });
    this._name = new Name(props.name);
    this._position = new Position(props.position);
    this._lessons = orderedLessons.map((lesson) => new Lesson(lesson));
  }

  get id(): Id {
    return this._id;
  }

  get name(): Name {
    return this._name;
  }

  get position(): Position {
    return this._position;
  }

  get lessons(): Lesson[] {
    return this._lessons;
  }

  get notifications(): Record<string, string[]> {
    return {
      ...this._id.getNotifications(),
      ...this._name.getNotifications(),
      ...this._position.getNotifications(),
      ...this._lessons.reduce(
        (acc, lesson) => ({ ...acc, ...lesson.notifications }),
        {}
      ),
    };
  }

  get numberOfLessons(): number {
    return this._lessons.length;
  }

  get firstLesson(): Lesson {
    return this._lessons[0];
  }

  get lastLesson(): Lesson {
    return this._lessons[this.numberOfLessons - 1];
  }

  get duration(): Duration {
    return this._lessons.reduce((durationTotal: Duration, lesson: Lesson) => {
      return durationTotal.sum(lesson.duration);
    }, new Duration(0));
  }

  addLesson(lesson: Lesson, position?: number): void {
    const newLessons =
      position !== undefined
        ? [
            ...this.lessons.slice(0, position),
            lesson,
            ...this.lessons.slice(position),
          ]
        : [...this.lessons, lesson];

    this._lessons = newLessons;
  }

  removeLesson(lessonSelected: Lesson): Chapter {
    const otherLessons = this.lessons.filter((lesson) =>
      lesson.isNotEqual(lessonSelected)
    );

    this.setLessons(otherLessons);

    return this;
  }

  getProps(): ChapterProps {
    return {
      id: this._id.getValue,
      name: this._name.value,
      lessons: this._lessons.map((lesson) => lesson.getProps()),
      position: this._position.value,
    };
  }

  isValid(): boolean {
    return (
      this._id.isValid() &&
      this._name.isValid() &&
      this._position.isValid() &&
      this._lessons.every((lesson) => lesson.isValid())
    );
  }

  private setLessons(newLessons: Lesson[]): void {
    this._lessons = newLessons.map((lesson) => new Lesson(lesson.getProps()));
  }

  private static sortLessons(lessons: Lesson[]): Lesson[] {
    return lessons.sort(
      (lessonA, lessonB) => lessonA.position.value - lessonB.position.value
    );
  }

  private static orderLessons(props: LessonProps[]): LessonProps[] {
    const lessons = props.map((lesson) => new Lesson(lesson));
    return this.reorderLessons(lessons).map((lesson) => lesson.getProps());
  }

  private static reorderLessons(lessons: Lesson[]): Lesson[] {
    const sorted = Chapter.sortLessons(lessons);
    return sorted.map(
      (lesson, index) =>
        new Lesson({
          id: lesson.id.getValue,
          name: lesson.name.value,
          urlVideo: lesson.urlVideo.value,
          duration: lesson.duration.value,
          position: index + 1,
        })
    );
  }
}
