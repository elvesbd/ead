import { EntityProps } from '@/shared/ValueObjects/Entity/types/EntityProps';

export type UserProps = {
  firstName: string;
  lastName: string;
} & EntityProps;
