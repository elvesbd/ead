import Lesson from '@/model/Course/Lesson';
import LessonBuilder from '@/test/data/builder/Course/Lesson/LessonBuilder';

describe('Entity - Lesson', () => {
  let lesson: Lesson;
  const props = LessonBuilder.aLesson().build();

  beforeEach(() => {
    jest.clearAllMocks();
    lesson = new Lesson(props);
  });

  describe('Creation', () => {
    it('should create a lesson on success', () => {
      const lesson = new Lesson(props);

      expect(lesson).toBeDefined();
      expect(lesson).toBeInstanceOf(Lesson);
    });
  });

  describe('getProps()', () => {
    it('should return lesson props on success', () => {
      const result = lesson.getProps();
      expect(result).toStrictEqual(props);
    });
  });

  describe('isValid()', () => {
    it('should return true if user is valid', () => {
      const result = lesson.isValid();
      expect(result).toBeTruthy();
    });

    it('should return false ir lesson is not valid', () => {
      const props = LessonBuilder.aLesson().withInvalidName().build();
      const lesson = new Lesson(props);
      const result = lesson.isValid();
      expect(result).toBeFalsy();
    });
  });

  describe('getNotifications()', () => {
    it('should return notifications for an invalid name', () => {
      const props = LessonBuilder.aLesson().withInvalidName().build();
      const lesson = new Lesson(props);
      const expectedResult = {
        Nome: [
          'Nome não pode ser vazio!',
          'Nome não pode ter menos que 5 caracteres!',
        ],
      };

      const result = lesson.notifications;

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an invalid duration', () => {
      const props = LessonBuilder.aLesson().withInvalidDuration().build();
      const lesson = new Lesson(props);

      const expectedResult = {
        Duration: [`Duration deve ser maior que ${props.duration}!`],
      };

      const result = lesson.notifications;

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an invalid url', () => {
      const props = LessonBuilder.aLesson().withInvalidUrl().build();
      const lesson = new Lesson(props);

      const expectedResult = {
        Url: ['Url deve ser válida!'],
      };

      const result = lesson.notifications;

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return notifications for an invalid position', () => {
      const props = LessonBuilder.aLesson().withInvalidPosition().build();

      const lesson = new Lesson(props);

      const expectedResult = {
        Position: [`Position deve ser maior que ${props.position}!`],
      };

      const result = lesson.notifications;

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return success for a valid name', () => {
      const lesson = new Lesson(props);

      const result = lesson.notifications;

      expect(result).toStrictEqual({});
    });
  });
});
