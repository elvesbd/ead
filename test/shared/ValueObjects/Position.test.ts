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
        const newPosition = new Position(5);
        expect(position.isEqual(newPosition)).toBeTruthy();
      });

      it('should return false if positions equals', () => {
        const newPosition = new Position(2);
        expect(position.isEqual(newPosition)).toBeFalsy();
      });
    });

    describe('isDifferent()', () => {
      it('should return true if positions is equals', () => {
        const newPosition = new Position(6);

        expect(position.isDifferent(newPosition)).toBeTruthy();
      });

      it('should return false if positions is not equals', () => {
        const newPosition = new Position(5);

        expect(position.isDifferent(newPosition)).toBeFalsy();
      });
    });

    describe('compare()', () => {
      it('should return 0 if positions is equals', () => {
        const newPosition = new Position(5);

        expect(position.compare(newPosition)).toBe(0);
      });

      it('should return 1 if current position is greater than the new position', () => {
        const newPosition = new Position(2);

        expect(position.compare(newPosition)).toBe(1);
      });

      it('should return -1 if current position is smaller than the new position', () => {
        const newPosition = new Position(8);

        expect(position.compare(newPosition)).toBe(-1);
      });
    });

    describe('getNotifications()', () => {
      it('should return notification if value is zero', () => {
        const value = 0;
        const position = new Position(value);
        const expectedResult = {
          Position: ['Position deve ser maior que 0!'],
        };

        const result = position.getNotifications();

        expect(result).toStrictEqual(expectedResult);
      });

      it('should return empty notification if value is not negative', () => {
        const result = position.getNotifications();
        expect(result).toStrictEqual({});
      });
    });
  });
});
