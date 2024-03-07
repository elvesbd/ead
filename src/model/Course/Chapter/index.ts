import Entity from '@/shared/ValueObject/Entity';
import { ChapterProps } from './types/ChapterProps';
import Position from '@/shared/ValueObject/Position';
import Name from '@/shared/ValueObject/Name';
import Lesson from '../Lesson';
import Duration from '@/shared/ValueObject/Duration';

export default class Chapter extends Entity<Chapter, ChapterProps> {
  private _name: Name;
  private _position: Position;
  private _lessons: Lesson[];

  constructor(props: ChapterProps) {
    super(props);
    this._name = new Name(props.name);
    this._position = new Position(props.position);
    this._lessons = props.lessons.map((lesson) => new Lesson(lesson));
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

  get numberOfClasses(): number {
    return this._lessons.length;
  }

  get firstLesson(): Lesson {
    return this._lessons[0];
  }

  get lastLesson(): Lesson {
    return this._lessons[this.numberOfClasses - 1];
  }

  get duration(): Duration {
    return this._lessons.reduce((durationTotal: Duration, lesson: Lesson) => {
      return durationTotal.sum(lesson.duration);
    }, new Duration(0));
  }
}
