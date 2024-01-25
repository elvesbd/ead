import { EntityProps } from '@/shared/ValueObject/Entity/types/EntityProps';
import { LessonProps } from '../../Lesson/types/LessonProps';

export type ChapterProps = {
  name: string;
  position: number;
  lessons: LessonProps[];
} & EntityProps;
