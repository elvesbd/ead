import Url from '@/shared/ValueObject/Url';
import Name from '@/shared/ValueObject/Name';
import Entity from '@/shared/ValueObject/Entity';
import { LessonProps } from './types/LessonProps';
import Duration from '@/shared/ValueObject/Duration';
import Position from '@/shared/ValueObject/Position';

export default class Lesson extends Entity<Lesson, LessonProps> {
  private _name: Name;
  private _urlVideo: Url;
  private _duration: Duration;
  private _position: Position;

  constructor(props: LessonProps) {
    super(props);
    this._name = new Name(props.name);
    this._urlVideo = new Url(props.urlVideo);
    this._duration = new Duration(props.duration);
    this._position = new Position(props.position);
  }

  get duration(): Duration {
    return this._duration;
  }

  getProps(): LessonProps {
    return {
      id: this._id.getValue,
      name: this._name.value,
      urlVideo: this._urlVideo.value,
      duration: this._duration.value,
      position: this._position.value,
    };
  }

  isValid(): boolean {
    return (
      this._id.isValid() &&
      this._name.isValid() &&
      this._urlVideo.isValid() &&
      this._duration.isValid() &&
      this._position.isValid()
    );
  }

  get notifications(): Record<string, string[]> {
    return {
      ...this._id.getNotifications(),
      ...this._name.getNotifications(),
      ...this._urlVideo.getNotifications(),
      ...this._duration.getNotifications(),
      ...this._position.getNotifications(),
    };
  }
}
