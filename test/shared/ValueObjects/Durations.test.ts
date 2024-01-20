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

  describe('Methods', () => {
    describe('sum()', () => {
      it('should return the sum of two durations in seconds', () => {
        const newDuration = new Duration(3600);

        expect(duration.sum(newDuration).seconds).toBe(7200);
      });

      it('should return the sum of two durations formatted in hours and minutes', () => {
        const newDuration = new Duration(3600);

        expect(duration.sum(newDuration).formattedHourAndMinutes).toBe(
          '02h 00m'
        );
      });

      it('should return the sum of two durations formatted in hours minutes and seconds', () => {
        const newDuration = new Duration(3600);

        expect(
          duration.sum(newDuration).formattedHourAndMinutesAndSeconds
        ).toBe('02h 00m 00s');
      });
    });

    describe('isEqual()', () => {
      it('should return true if durations is equals', () => {
        const newDuration = new Duration(3600);

        expect(duration.isEqual(newDuration)).toBeTruthy();
      });

      it('should return false if durations is not equals', () => {
        const newDuration = new Duration(1800);

        expect(duration.isEqual(newDuration)).toBeFalsy();
      });
    });

    describe('getNotifications()', () => {
      it('should return notification if value is negative', () => {
        const value = -1;
        const duration = new Duration(value);
        const expectedResult = {
          Duration: ['Duration não pode ser um número negativo!'],
        };

        const result = duration.getNotifications();

        expect(result).toStrictEqual(expectedResult);
      });

      it('should return empty notification if value is not negative', () => {
        const result = duration.getNotifications();
        expect(result).toStrictEqual({});
      });
    });
  });
});
