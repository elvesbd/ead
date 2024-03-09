import Chapter from '@/model/Course/Chapter';
import ChapterBuilder from '@/test/data/builder/Course/Chapter/ChapterBuilder';
import LessonBuilder from '@/test/data/builder/Course/Lesson/LessonBuilder';

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

      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('lessons');
      expect(result).toHaveProperty('position');

      expect(result.name).toBeDefined();
      expect(result.lessons).toHaveLength(10);
      expect(result.position).toBeGreaterThanOrEqual(1);
      expect(result.position).toBeLessThanOrEqual(100);
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

  describe('getDuration()', () => {
    it('should return the sum of the duration of the lessons', () => {
      const lessons = [
        LessonBuilder.aLesson()
          .withName('Aula #1')
          .withDuration(63)
          .withPosition(1)
          .build(),

        LessonBuilder.aLesson()
          .withName('Aula #2')
          .withDuration(1007)
          .withPosition(2)
          .build(),

        LessonBuilder.aLesson()
          .withName('Aula #3')
          .withDuration(3784)
          .withPosition(3)
          .build(),
      ];
      const props = ChapterBuilder.aChapter().withLessons(lessons).build();

      const chapter = new Chapter(props);

      expect(chapter.duration.value).toBe(4854);
      expect(chapter.duration.formattedHourAndMinutes).toBe('01h 20m');
    });
  });

  describe('orderLessons()', () => {
    it('should return the correct order of the lessons', () => {
      const lessons = [
        LessonBuilder.aLesson()
          .withName('Aula #1')
          .withDuration(63)
          .withPosition(2)
          .build(),

        LessonBuilder.aLesson()
          .withName('Aula #2')
          .withDuration(1007)
          .withPosition(3)
          .build(),

        LessonBuilder.aLesson()
          .withName('Aula #3')
          .withDuration(3784)
          .withPosition(1)
          .build(),
      ];
      const props = ChapterBuilder.aChapter().withLessons(lessons).build();

      const chapter = new Chapter(props);

      expect(chapter.lessons[0].position.value).toBe(1);
      expect(chapter.lessons[1].position.value).toBe(2);
      expect(chapter.lessons[2].position.value).toBe(3);
    });
  });
  describe('numberOfLessons()', () => {
    it('should return the number of the lessons', () => {
      expect(chapter.numberOfLessons).toBe(10);
    });
  });

  describe('firstLesson()', () => {
    it('should return the first lesson', () => {
      const lessons = [
        LessonBuilder.aLesson()
          .withName('Aula #1')
          .withDuration(63)
          .withPosition(1)
          .build(),

        LessonBuilder.aLesson()
          .withName('Aula #2')
          .withDuration(1007)
          .withPosition(2)
          .build(),

        LessonBuilder.aLesson()
          .withName('Aula #3')
          .withDuration(3784)
          .withPosition(3)
          .build(),
      ];

      const props = ChapterBuilder.aChapter().withLessons(lessons).build();
      const chapter = new Chapter(props);

      expect(chapter.firstLesson.getProps()).toStrictEqual(lessons[0]);
    });
  });

  describe('lasLesson()', () => {
    it('should return the last lessons', () => {
      const lessons = [
        LessonBuilder.aLesson()
          .withName('Aula #1')
          .withDuration(63)
          .withPosition(1)
          .build(),

        LessonBuilder.aLesson()
          .withName('Aula #2')
          .withDuration(1007)
          .withPosition(2)
          .build(),

        LessonBuilder.aLesson()
          .withName('Aula #3')
          .withDuration(3784)
          .withPosition(3)
          .build(),
      ];
      const props = ChapterBuilder.aChapter().withLessons(lessons).build();
      const chapter = new Chapter(props);

      expect(chapter.lastLesson.getProps()).toStrictEqual(lessons[2]);
    });
  });
});
