import Entity from '@/shared/ValueObject/Entity';
import { ChapterProps } from './types/ChapterProps';
import Position from '@/shared/ValueObject/Position';
import Name from '@/shared/ValueObject/Name';
import Lesson from '../Lesson';

export default class Chapter extends Entity<Chapter, ChapterProps> {
  private _name: Name;
  private _position: Position;
  private _lessons: Lesson[];

  constructor(props: ChapterProps) {
    super(props);
    this._name = new Name(props.name);
    this._position = new Position(props.position);
    this._lessons = props.lessons.map((lesson) => new Lesson(lesson)) ?? [];
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
    throw new Error('Method not implemented.');
  }

  get notifications(): Record<string, string[]> {
    throw new Error('Method not implemented.');
  }
}
