import Notification from '@/core/utils/Notifications';

export default class PersonName {
  readonly value: string;

  constructor(value: string) {
    this.value = value.trim();

    const errors = Notification.notifications(
      Notification.isEmpty(this.value),
      Notification.isLessThan(this.value, 4),
      Notification.isMoreThan(this.value, 120),
      Notification.isOnlyLetters(this.value)
    );

    if (errors) throw new Error(errors.join(','));
  }

  get fullName() {
    return this.value;
  }

  get initials() {
    const words = this.value.split(' ');
    const initials = words.map((word) => word[0].toUpperCase());
    return initials.join('');
  }
}
