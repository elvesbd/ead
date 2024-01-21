import Position from '@/shared/ValueObject/Position';

describe('Value Object - Position', () => {
  let position: Position;
  const value = 5;

  beforeEach(() => {
    jest.clearAllMocks();
    position = new Position(value);
  });

  describe('Creation', () => {
    it('should create a position instance with success', () => {
      expect(position).toBeInstanceOf(Position);
    });
  });

  describe('Getters', () => {
    it('should return a position', () => {
      expect(position.value).toBe(5);
    });
  });

  describe('Methods', () => {
    describe('isEqual()', () => {
      it('should return true if positions equals', () => {
        const otherPosition = new Position(5);
        expect(position.isEqual(otherPosition)).toBeTruthy();
      });

      it('should return false if positions equals', () => {
        const otherPosition = new Position(2);
        expect(position.isEqual(otherPosition)).toBeFalsy();
      });
    });

    describe('isDifferent()', () => {
      it('should return true if positions is equals', () => {
        const otherPosition = new Position(6);

        expect(position.isDifferent(otherPosition)).toBeTruthy();
      });

      it('should return false if positions is not equals', () => {
        const otherPosition = new Position(5);

        expect(position.isDifferent(otherPosition)).toBeFalsy();
      });
    });

    describe('compare()', () => {
      it('should return 0 if positions is equals', () => {
        const otherPosition = new Position(5);

        expect(position.compare(otherPosition)).toBe(0);
      });

      it('should return 1 if current position is greater than the new position', () => {
        const otherPosition = new Position(2);

        expect(position.compare(otherPosition)).toBe(1);
      });

      it('should return -1 if current position is smaller than the new position', () => {
        const otherPosition = new Position(8);

        expect(position.compare(otherPosition)).toBe(-1);
      });
    });

    describe('sorting()', () => {
      it('should return -1 if current position is smaller than the new position', () => {
        const positions = [new Position(3), new Position(1), new Position(2)];
        const expectedResult = [
          new Position(1),
          new Position(2),
          new Position(3),
        ];

        const result = position.sorting(positions);

        expect(result).toStrictEqual(expectedResult);
      });
    });

    describe('getNotifications()', () => {
      it('should return notification if value is zero', () => {
        const value = 0;
        const otherPosition = new Position(value);
        const expectedResult = {
          Position: ['Position deve ser maior que 0!'],
        };

        const result = otherPosition.getNotifications();

        expect(result).toStrictEqual(expectedResult);
      });

      it('should return empty notification if value is not negative', () => {
        const result = position.getNotifications();
        expect(result).toStrictEqual({});
      });
    });
  });
});
