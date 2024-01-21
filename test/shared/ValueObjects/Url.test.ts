import Url from '@/shared/ValueObject/Url';

describe('Value Object - Url', () => {
  let url: Url;
  const value = 'https://www.test.com/search?q=typescript&hl=pt-BR';

  beforeEach(() => {
    jest.clearAllMocks();
    url = new Url(value);
  });

  describe('Creation', () => {
    it('should be create a name instance of success', () => {
      expect(url).toBeInstanceOf(Url);
    });
  });

  describe('Getters', () => {
    it('should return url with success', () => {
      expect(url.value).toBe(value);
    });

    it('should return null if protocol does not exists', () => {
      const url = new Url('//www.test.com');
      const result = url.protocol;

      expect(result).toBeNull();
    });

    it('should return protocol with success', () => {
      expect(url.protocol).toBe('https:');
    });

    it('should return null if domain does not exists', () => {
      const url = new Url('https://');
      const result = url.domain;

      expect(result).toBeNull();
    });

    it('should return domain with success', () => {
      expect(url.domain).toBe('www.test.com');
    });

    it('should return null if path does not exists', () => {
      const url = new Url('search');
      const result = url.path;

      expect(result).toBeNull();
    });

    it('should return path with success', () => {
      expect(url.path).toBe('/search');
    });

    it('should return null if search params does not exists', () => {
      const url = new Url('https://www.test.com');
      const result = url.params;

      expect(result).toBeNull();
    });

    it('should return null if url does not exists', () => {
      const url = new Url('');
      const result = url.params;

      expect(result).toBeNull();
    });

    it('should return params with success', () => {
      const expectedResult = {
        q: 'typescript',
        hl: 'pt-BR',
      };

      expect(url.params).toStrictEqual(expectedResult);
    });
  });

  describe('Methods', () => {
    describe('getNotifications()', () => {
      it('should return notifications for not string', async () => {
        const invalidValue = 'http//test.com';
        const url = new Url(invalidValue);
        const expectedResult = {
          Url: ['Url deve ser válida!'],
        };

        const result = url.getNotifications();

        expect(result).toStrictEqual(expectedResult);
      });

      it('should return success for a valid url', () => {
        const expectedResult = {};

        const result = url.getNotifications();

        expect(result).toStrictEqual(expectedResult);
      });
    });
  });
});
