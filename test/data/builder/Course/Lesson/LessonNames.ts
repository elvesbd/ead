export default class LessonName {
  static readonly names = [
    'Array',
    'Generics',
    'Functions',
    'Abstração',
    'Typescript',
    'Decorators',
    'Javascript',
    'Declarations',
    'Destructuring',
    'Value objects',
    'Abstract class',
    'Fundaments POO',
    'Arrow functions',
  ];

  static get(): string {
    const index = Math.floor(Math.random() * LessonName.names.length);
    return LessonName.names[index];
  }
}
