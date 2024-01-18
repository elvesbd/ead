import Duration from '@/shared/ValueObject/Duration';

describe('Value Object - Duration', () => {
  let duration: Duration;
  const value = 3600;

  beforeEach(() => {
    jest.clearAllMocks();
    duration = new Duration(value);
  });

  describe('Creation', () => {
    it('should create a duration instance with success', () => {
      expect(duration).toBeInstanceOf(Duration);
    });

    it('should create a zeroed duration', () => {
      const duration = new Duration();

      expect(duration.seconds).toBe(0);
      expect(duration.formattedHourAndMinutes).toBe('00h 00m');
      expect(duration.formattedHourAndMinutesAndSeconds).toBe('00h 00m 00s');
    });
  });

  describe('Getters', () => {
    it('should return a seconds', () => {
      expect(duration.seconds).toBe(3600);
    });

    it('should return true if zeroed seconds', () => {
      const duration = new Duration();
      expect(duration.zeroed).toBeTruthy();
    });

    it('should return false if zeroed seconds', () => {
      expect(duration.zeroed).toBeFalsy();
    });

    it('should return the duration formatted in hours and minutes', () => {
      expect(duration.formattedHourAndMinutes).toBe('01h 00m');
    });

    it('should return the duration formatted in hours minutes and seconds', () => {
      expect(duration.formattedHourAndMinutesAndSeconds).toBe('01h 00m 00s');
    });
  });
});
