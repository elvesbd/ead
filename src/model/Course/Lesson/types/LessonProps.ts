import { EntityProps } from '@/shared/ValueObject/Entity/types/EntityProps';

export type LessonProps = {
  name: string;
  duration: number;
  urlVideo: string;
  position: number;
} & EntityProps;
