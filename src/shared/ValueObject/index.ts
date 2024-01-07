import Notification from '@/utils/core-validator/Notification';
import { Notifiable } from '@/utils/core-validator/Notifiable';

export abstract class ValueObject extends Notifiable<Notification> {}
