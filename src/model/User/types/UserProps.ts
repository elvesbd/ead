import { EntityProps } from '@/shared/ValueObject/Entity/types/EntityProps';

export type UserProps = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
} & EntityProps;
