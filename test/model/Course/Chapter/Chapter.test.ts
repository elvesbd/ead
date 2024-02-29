import Chapter from '@/model/Course/Chapter';
import ChapterBuilder from '@/test/data/builder/Course/Chapter/ChapterBuilder';

describe('Entity - Chapter', () => {
  let chapter: Chapter;
  const props = ChapterBuilder.aChapter().build();

  beforeEach(() => {
    jest.clearAllMocks();
    chapter = new Chapter(props);
  });

  describe('Creation', () => {
    it('should create a chapter on success', () => {
      expect(chapter).toBeDefined();
      expect(chapter).toBeInstanceOf(Chapter);
    });
  });

  describe('getProps()', () => {
    it('should return chapter props on success', () => {
      const result = chapter.getProps();
      expect(result).toStrictEqual(props);
    });
  });

  describe('isValid()', () => {
    it('should return true if user is valid', () => {
      const result = chapter.isValid();
      expect(result).toBeTruthy();
    });

    it('should return false ir chapter is not valid', () => {
      const props = ChapterBuilder.aChapter().withInvalidName().build();
      const chapter = new Chapter(props);
      const result = chapter.isValid();
      expect(result).toBeFalsy();
    });
  });

  describe('getNotifications()', () => {
    it('should return notifications for an invalid name', () => {
      const props = ChapterBuilder.aChapter().withInvalidName().build();
      const chapter = new Chapter(props);
      const expectedResult = {
        Nome: [
          'Nome não pode ser vazio!',
          'Nome não pode ter menos que 5 caracteres!',
        ],
      };

      const result = chapter.notifications;
      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an invalid position', () => {
      const props = ChapterBuilder.aChapter().withInvalidPosition().build();
      const chapter = new Chapter(props);
      const expectedResult = {
        Position: ['Position deve ser maior que 0!'],
      };

      const result = chapter.notifications;
      expect(result).toStrictEqual(expectedResult);
    });

    it('should return success for a valid chapter', () => {
      const result = chapter.notifications;
      expect(result).toStrictEqual({});
    });
  });
});
